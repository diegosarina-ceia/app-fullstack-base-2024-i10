-- SQL Dump para el proyecto Smart Home
-- Versión phpMyAdmin: 4.8.5
-- Generado el 26 de mayo de 2019 a las 14:50
-- Servidor: localhost
-- Versión del servidor: 5.7.26-0ubuntu0.16.04.1
-- Versión de PHP: 7.0.33-0ubuntu0.16.04.4

CREATE DATABASE IF NOT EXISTS smart_home;

USE smart_home;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_home`
--

-- --------------------------------------------------------

--
-- Table structure for table `Devices`
--

CREATE TABLE `Devices` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `description` varchar(128) NOT NULL,
  `state` decimal(2,1) NOT NULL,
  `typeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `DevicesTypes`
--

CREATE TABLE `DevicesTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `material_icon_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Devices`
--
INSERT INTO `Devices` (`id`, `name`, `description`, `state`, `typeId`) VALUES
(1, 'Lampara 1', 'Luz living', 1, 1),
(2, 'Lampara 2', 'Luz cocina', 0, 1),
(3, 'Velador', 'Velador living', 1, 1),
(4, 'Persiana 1', 'Persiana living', 1, 2),
(5, 'Persiana 2', 'Persiana de la cocina', 1, 2),
(6, 'Persiana 3', 'Persiana balcon', 0, 2),
(7, 'Aire Acondicionado 1', 'Aire Acondicionado Living', 1, 3),
(8, 'Aire Acondicionado 2', 'Aire Acondicionado Dormitorio', 0, 3),
(9, 'TV Living', 'Televisor en el living', 1, 4),
(10, 'TV Dormitorio', 'Televisor en el dormitorio principal', 1, 4),
(11, 'Ventilador 1', 'Ventilador techo cocina', 0, 5),
(12, 'Ventilador 2', 'Ventilador de pie en sala de estar', 1, 5),
(13, 'Enchufe Cocina', 'Enchufe principal de la cocina', 1, 6),
(14, 'Refrigerador', 'Refrigerador en la cocina', 1, 7),
(15, 'Cámara de Seguridad', 'Cámara en la entrada principal', 1, 8),
(16, 'Calefacción 1', 'Sistema de calefacción en el living', 0, 9);


-- Inserto registros en la tabla `DevicesTypes`
-- DeviceTypes se usa para definir el tipo de cada dispositivo
INSERT INTO `DevicesTypes` (`id`, `name`, `material_icon_name`) VALUES
(1, 'Lámpara', 'lightbulb_outline'),
(2, 'Persiana', 'grid_on'),
(3, 'Aire acondicionado', 'ac_unit'),
(4, 'TV', 'tv'),
(5, 'Ventilador', 'slow_motion_video'),
(6, 'Enchufe', 'power'),
(7, 'Refrigerador', 'kitchen'),
(8, 'Cámara de seguridad', 'videocam'),
(9, 'Calefacción', 'whatshot'),
(10, 'Termostato', 'thermostat'),
(11, 'Sensor de movimiento', 'motion_sensor_active'),
(12, 'Humidificador', 'water_damage');

--
-- Indexes for table `Devices`
--
ALTER TABLE `Devices`
  ADD PRIMARY KEY (`id`);

--
-- Agrego indice para la tabla `DevicesTypes`
--
ALTER TABLE `DevicesTypes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for table `Devices`
--
ALTER TABLE `Devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- agrego AUTO_INCREMENT for table `DevicesTypes`
--
ALTER TABLE `DevicesTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;


--
-- defino la clave foránea para la tabla `Devices` apuntando a `DevicesTypes`
--
ALTER TABLE `Devices`
  ADD FOREIGN KEY (`typeId`) REFERENCES `DevicesTypes`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
