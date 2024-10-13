/**
 * DEFINO INTERFACES
 */
interface Device {
    id: number;
    name: string;
    description: string;
    state: number;
    typeId: number;
}
interface DeviceType {
    id: number;
    name: string;
    material_icon_name: string;
}
/**
 * FIN BLOQUE INTERFACES
 */




/**
 * DEFINO SERVICIO API
 */
const BASE_URL = 'http://localhost:8000';

async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function getDevices(): Promise<Device[]> {
    return fetchJson<Device[]>(`${BASE_URL}/devices`);
}

async function getDeviceTypes(): Promise<DeviceType[]> {
    return fetchJson<DeviceType[]>(`${BASE_URL}/deviceTypes`);
}

async function updateDeviceState(deviceId: number, newState: number): Promise<void> {
    // console.log(`Enviando al servidor: ID - ${deviceId}, Estado - ${newState}`);
    await fetchJson(`${BASE_URL}/device/${deviceId}/state`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState })
    });
}

async function deleteDevice(deviceId: number): Promise<void> {
    await fetchJson(`${BASE_URL}/device/${deviceId}`, { method: 'DELETE' });
}

async function saveDevice(deviceId: number, deviceData: Partial<Device>): Promise<void> {
    const method = deviceId > 0 ? 'PUT' : 'POST';
    const url = deviceId > 0 ? `${BASE_URL}/device/${deviceId}` : `${BASE_URL}/device`;
    
    await fetchJson(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deviceData)
    });
}
/**
 * FIN SERVICIO API
 */



/**
 * DEFINO UTILIDADES
 */

function retrieveElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id "${id}" not found`);
    }
    return element;
}

function refreshDeviceTypesCombo(deviceTypes: DeviceType[], selectedTypeId: number = 0): void {
    const comboOptionsInnerHTML = deviceTypes.map(deviceType => 
        `<option value="${deviceType.id}" ${selectedTypeId === deviceType.id ? "selected" : ""}>${deviceType.name}</option>`
    ).join('');

    const combo = retrieveElement("editTypeId") as HTMLSelectElement;
    combo.innerHTML = '<option value="0" disabled selected>Seleccionar el tipo de dispositivo</option>' + comboOptionsInnerHTML;

    M.FormSelect.init(combo);
}

// Declaración necesaria para Materialize
declare const M: any;

function initializeMaterialize(): void {
    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    });
}

/**
 *  FIN SERVICIO UTILIDADES
 */



/**
 *  INICIO BLOQUE PRINCIPAL
 */
class Main implements EventListenerObject {
    private devices: Array<Device> = [];
    private deviceTypes: Array<DeviceType> = [];
    private deviceId_toEdit: number = 0;
    private totalDevicesCount: number = 0;

    constructor() {
        this.initializeEventListeners();
        this.getDeviceTypes(true);
        this.refreshTotalDevicesCount();
    }

    private initializeEventListeners(): void {
        ['btnRefresh', 'btnAddDevice', 'saveDevice', 'cancelDeviceChanges'].forEach(id => {
            retrieveElement(id).addEventListener('click', this);
        });
    }

    handleEvent(event: Event): void {
        const target = event.target as HTMLElement;
        
        type ActionMap = {
            [key: string]: () => void | Promise<void>;
        };

        const actions: ActionMap = {
            'btnRefresh': () => this.refreshDevices(),
            'saveDevice': () => this.saveDevice(),
            'cancelDeviceChanges': () => this.hideDeviceEditPanel(),
            'btnAddDevice': () => this.showDeviceEditPanel(-1),
            'edit-device-state': () => this.handleDeviceStateChange(target as HTMLInputElement),
            'edit-device': () => this.handleEditDevice(target as HTMLElement),
            'delete-device': () => this.handleDeleteDevice(target as HTMLElement)
        };

        const actionKey = target.id || target.getAttribute('name') || '';
        const action = actions[actionKey];

        if (action) {
            action();
        }
    }

    private async refreshDevices(): Promise<void> {
        try {
            this.devices = await getDevices();
            this.renderDeviceList();
        } catch (error) {
            alert("Error al obtener dispositivos");
        }
    }

    private async refreshTotalDevicesCount(): Promise<void> {
        try {
            const response = await fetch('/devices/count');
            if (!response.ok) {
                throw new Error('Error al obtener la cantidad total de dispositivos');
            }
    
            const data = await response.json();
            // console.log('Datos recibidos:', data);
    
            // Verifico que sea un numero
            if (!Array.isArray(data) || data.length === 0 || typeof data[0].count !== 'number') {
                throw new Error('El conteo de dispositivos no es un número válido');
            }
    
            this.totalDevicesCount = data[0].count;
            //console.log('Total de dispositivos:', this.totalDevicesCount);
            this.renderTotalDeviceCount();
        } catch (error) {
            alert(error);
        }
    }
    

    private renderDeviceList(): void {
        const ul = retrieveElement("deviceList");
        ul.innerHTML = this.devices.map(item => this.createDeviceListItem(item)).join('');
        this.addEventListenersToDeviceList();
    }

    private renderTotalDeviceCount(): void {
        const span = document.getElementById("total-devices");
        if (span) {
            span.innerText = this.totalDevicesCount != null ? this.totalDevicesCount.toString() : '0';
        }
    }

    private createDeviceListItem(item: Device): string {
        const deviceType = this.getDeviceTypeById(item.typeId);
        const iconName = deviceType ? deviceType.material_icon_name : '';
        const intensityValue = item.state * 100; // rango entre 0-100
        return `
            <li class="card luz">
                <div class="card-content">
                    <span class="card-title">
                        Nombre dispositivo: ${item.name} <i class="material-icons">${iconName}</i>
                    </span>
                    <p>Descripción: ${item.description}</p>
                    <p>Intensidad:</p>
                    <input type="range" min="0" max="100" step="1" value="${intensityValue}" class="intensity-slider" name="edit-device-state" device-id-bd="${item.id}">
                    <div style="text-align: right;">
                        <button class="btn waves-effect waves-light blue" type="button" name="edit-device" device-id-bd="${item.id}">Editar</button>
                        <button class="btn waves-effect waves-light red" type="button" name="delete-device" device-id-bd="${item.id}">Eliminar</button>
                    </div>
                </div>
            </li>`;
    }

    private addEventListenersToDeviceList(): void {
        ['edit-device', 'edit-device-state', 'delete-device'].forEach(name => {
            document.getElementsByName(name).forEach(element => {
                element.addEventListener(name === 'edit-device-state' ? 'change' : 'click', this);
            });
        });
    }

    private async handleDeviceStateChange(input: HTMLInputElement): Promise<void> {
        const deviceId = parseInt(input.getAttribute("device-id-bd") || '');
        const newState = parseFloat(input.value) / 100;
        console.log(`Dispositivo ID: ${deviceId}, Nuevo estado: ${newState}`);
        try {
            await updateDeviceState(deviceId, newState);
            this.refreshDevices();
            input.value = (newState * 100).toString();
        } catch (error) {
            alert(`Error al actualizar el estado del dispositivo ${deviceId}`);
        }
    }
    

    private handleEditDevice(button: HTMLElement): void {
        const deviceId = parseInt(button.getAttribute('device-id-bd') || '');
        this.showDeviceEditPanel(deviceId);
    }

    private showDeviceEditPanel(deviceId: number): void {
        this.deviceId_toEdit = deviceId;
        const isEditing = deviceId > 0;
        const device = isEditing ? this.getDeviceById(deviceId) : null;

        (retrieveElement("deviceEditorTitle") as HTMLElement).innerText = isEditing ? "Editar dispositivo" : "Agregar dispositivo";
        (retrieveElement("editName") as HTMLInputElement).value = device ? device.name : "";
        (retrieveElement("editDescription") as HTMLInputElement).value = device ? device.description : "";
        refreshDeviceTypesCombo(this.deviceTypes, device ? device.typeId : 0);

        retrieveElement("editPanel").style.display = "block";
        retrieveElement("actionPanel").style.display = "none";
    }

    private hideDeviceEditPanel(): void {
        retrieveElement("editPanel").style.display = "none";
        retrieveElement("actionPanel").style.display = "block";
    }

    private async handleDeleteDevice(button: HTMLElement): Promise<void> {
        const deviceId = parseInt(button.getAttribute('device-id-bd') || '');
        if (confirm('¿Confirma que desea eliminar el dispositivo del panel?')) {
            try {
                await deleteDevice(deviceId);
                this.refreshDevices();
                await this.refreshTotalDevicesCount();
            } catch (error) {
                alert(`Error al eliminar el dispositivo ${deviceId}`);
            }
        } 
    }

    private async saveDevice(): Promise<void> {
        const deviceName = (retrieveElement("editName") as HTMLInputElement).value;
        const deviceDescription = (retrieveElement("editDescription") as HTMLInputElement).value;
        const deviceTypeId = parseInt((retrieveElement("editTypeId") as HTMLSelectElement).value);

        if (!deviceName || !deviceDescription || isNaN(deviceTypeId)) {
            alert('No se han ingresado todos los datos');
            return;
        }

        const isEditing = this.deviceId_toEdit > 0;
        if (!confirm(`¿Confirma que desea ${isEditing ? 'editar' : 'agregar'} el dispositivo del panel?`)) {
            return;
        }

        try {
            await saveDevice(this.deviceId_toEdit, { name: deviceName, description: deviceDescription, typeId: deviceTypeId });
            this.hideDeviceEditPanel();
            this.refreshDevices();
            await this.refreshTotalDevicesCount();
        } catch (error) {
            alert(`Error al guardar el dispositivo ${deviceName}`);
        }
    }

    private async getDeviceTypes(refreshDevices: boolean): Promise<void> {
        try {
            this.deviceTypes = await getDeviceTypes();
            if (refreshDevices) {
                this.refreshDevices();
            }
        } catch (error) {
            alert("ERROR en la consulta de tipos de dispositivos");
        }
    }

    private getDeviceTypeById(id: number): DeviceType | undefined {
        return this.deviceTypes.find(deviceType => deviceType.id === id);
    }

    private getDeviceById(id: number): Device | undefined {
        return this.devices.find(device => device.id === id);
    }
}


window.addEventListener('load', () => {
    new Main();
    initializeMaterialize();
});