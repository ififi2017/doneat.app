---
title: "Política de privacidad — DoneAt"
description: "Cómo DoneAt almacena datos localmente por defecto, ofrece sincronización privada opcional con iCloud en iPhone y iPad, y maneja analíticas y servicios de terceros."
heading: "Política de privacidad"
intro: "Esta página explica cómo DoneAt almacena y procesa información: el sitio oficial, el temporizador web y las apps en iPhone, iPad, Mac y Windows."
updatedLabel: "Última actualización"
updated: "6 de septiembre de 2026"
---

## Datos almacenados por DoneAt

La información que introduces se almacena localmente por defecto: en el almacenamiento local del navegador en el temporizador web, y en los datos de la aplicación en iPhone, iPad, Mac y Windows. DoneAt no proporciona cuentas de producto ni envía esta información a servidores de DoneAt.

En iPhone y iPad puedes activar la sincronización con iCloud. Almacena tus horarios, registros, salario, preferencias de recordatorios, apariencia, idioma, perfil de vida y datos de Enfoque en tu base de datos privada de iCloud bajo tu cuenta de Apple. La autorización de notificaciones, protección biométrica, ajustes de Actividad en vivo, el temporizador de trabajo actual y el estado de incorporación quedan en cada dispositivo. El temporizador web, la app de Mac y la app de Windows siguen siendo locales y no son parte de esta sincronización.

La cuenta regresiva, el progreso y la estimación de ganancias se calculan en tu dispositivo a partir de esta información.

Esto típicamente incluye:

- Horas de inicio y fin, días laborables y ajustes de pausa u horas extra
- Cantidad salarial, período de pago e historial salarial de carrera
- Registros de trabajo y correcciones, etapas de carrera y hitos de vida o fechas que elijas introducir
- Títulos de tareas de enfoque, planes, sesiones y ajustes de descanso
- Preferencias de notificación y recordatorio
- Idioma y apariencia

## Sincronización opcional con iCloud

La sincronización está desactivada por defecto. Cuando la activas en iPhone o iPad, el servicio CloudKit de Apple almacena los datos descritos arriba en la base de datos privada asociada con tu cuenta de Apple. DoneAt no recibe una copia en sus propios servidores. Los dispositivos que usan la misma cuenta de Apple pueden recuperar y sincronizar esos datos; esto requiere una cuenta de iCloud disponible y conexión a la red.

Activar la sincronización requiere DoneAt Plus. La sincronización que ya está activada continúa después de que expire una suscripción. Desactivar la sincronización detiene la sincronización en ese dispositivo y mantiene tanto su copia local actual como la copia existente de iCloud. Desactivarla no elimina ninguna de las dos copias.

## Exportaciones de respaldo

En iPhone y iPad, una exportación de respaldo se crea solo cuando eliges Exportar. Un respaldo completo incluye tus registros, ajustes sincronizados, salario e historial salarial de carrera, perfil de vida, y tareas y sesiones de enfoque. También puedes exportar sin el perfil de vida; esa opción aún incluye salario e historial de carrera. La hoja de compartir del sistema te permite elegir dónde guardar o compartir el archivo.

La exportación es un archivo JSON legible, no un archivo protegido por contraseña. Elige una ubicación de almacenamiento y destinatarios apropiados para la información que contiene. Los archivos que guardas o compartes son copias separadas; eliminar datos en DoneAt no elimina esos archivos.

## Compras de Plus

En iPhone y iPad, Apple maneja las suscripciones de Plus y las compras de por vida a través de la App Store. DoneAt usa StoreKit para verificar el estado de compra y restaurar el acceso, y mantiene un registro local del derecho verificado y cualquier fecha de expiración. DoneAt no recibe los datos de tu tarjeta de pago ni envía tu estado de compra a un servidor de cuentas de DoneAt. Apple procesa la información de compra bajo sus propias políticas.

La expiración de una suscripción no elimina tus registros existentes. La exportación y eliminación siguen disponibles sin una suscripción activa.

## Sitio oficial

[doneat.app](https://doneat.app) es un sitio web estático. No recopila tu turno ni salario. Abrir la raíz del sitio, o una ruta corta como `/privacy` o `/download`, sigue el idioma de tu navegador y te envía a ese hall o a la página de soporte en inglés o chino simplificado. El idioma permanece en la URL de la página; este sitio no establece una cookie de idioma.

Para alojar las páginas, Vercel puede procesar información de conexión ordinaria como dirección IP e identificador del navegador bajo su propia política de privacidad. Este proyecto no almacena esa información ni la usa para crear un perfil tuyo.

El sitio oficial usa las analíticas sin cookies de Vercel para medir vistas de página y rendimiento de carga, y un pequeño conjunto de contadores agregados para ver qué entradas usa la gente. Los eventos provienen de una lista fija y pública, por ejemplo `hall_view`, `download_view`, `download_from_web`, `web_timer_open` o `app_store_open`, y se incrementan por día. La solicitud solo lleva el nombre del evento. No incluye un identificador de usuario, sesión, idioma, horario o salario, y no puede usarse para identificar o rastrear a una persona.

La lista completa de eventos está en este repositorio en [`src/lib/analytics-events.ts`](https://github.com/ififi2017/doneat.app/blob/main/src/lib/analytics-events.ts).

## Analíticas del temporizador web

El temporizador web en [off.rainif.com](https://off.rainif.com) también usa las analíticas sin cookies de Vercel para medir vistas de página y rendimiento de carga. Usa un conjunto separado y limitado de contadores agregados para entender el uso general de funciones.

Los eventos de producto provienen de otra lista fija y pública, como `share_open` o `countdown_start`, y se agregan por día. No contienen identificadores de usuario, información de sesión, horarios o datos salariales y no pueden usarse para identificar o rastrear a un individuo.

La lista completa de eventos de producto está disponible en el repositorio de código abierto del producto. Los proveedores de hosting y analíticas pueden procesar información de conexión estándar bajo sus respectivas políticas de privacidad. Este proyecto no almacena esa información por separado ni la usa para crear perfiles de usuario.

## Cookies

El temporizador web usa una cookie llamada `i18nextLng` para almacenar un código de idioma para que las visitas posteriores puedan abrirse en el idioma que elegiste. Se establece en la primera visita con el idioma actualmente mostrado, se actualiza cuando cambias de idioma, expira después de un año y puede eliminarse en tu navegador.

Ni el sitio oficial ni el temporizador web usan cookies de publicidad o rastreo entre sitios. Las analíticas descritas arriba no dependen de cookies.

## Compartir una cuenta regresiva

La URL de un enlace compartido contiene solo las horas de inicio y fin. No contiene información salarial. Una persona que abra el enlace solo puede ver los horarios del turno. Las imágenes de cuenta regresiva compartidas también omiten el salario. Una exportación de respaldo es diferente: puede contener salario y los otros datos personales listados arriba.

Si eliges compartir a través de un servicio social de terceros, se aplica la política de privacidad de ese servicio.

## Apps en tu teléfono y ordenador

Las apps de iPhone, iPad, Mac y Windows no recopilan analíticas de uso.

Una build de escritorio instalada desde GitHub comprueba si hay una versión más nueva cuando inicia. La solicitud no contiene cuenta, salario ni datos de uso, y un instalador solo se descarga después de que confirmes una actualización. Si GitHub no es accesible directamente, puedes elegir reintentar a través de un mirror de terceros. Las actualizaciones descargadas por cualquier canal se verifican por firma antes de la instalación.

Una build instalada desde la Microsoft Store no inicia comprobaciones de actualización. Las actualizaciones las proporciona la Microsoft Store.

Los recordatorios los programa y muestra localmente el sistema operativo. Las apps también acceden a la red cuando abres un enlace externo o eliges compartir a través de un servicio de terceros.

## Widgets, Actividades en vivo y protección del dispositivo

Los widgets y las Actividades en vivo usan la información necesaria para mostrar tu temporizador y progreso, incluida la información de Enfoque cuando corresponda. No incluyen salario. Las notificaciones locales también omiten el salario. Estas superficies pueden ser visibles en tu pantalla de inicio o de bloqueo; puedes gestionar su visibilidad y permisos de notificación en los ajustes de la app y del sistema.

Cuando DoneAt te pide que te autentiques para proteger ganancias o registros, la autenticación la maneja el dispositivo a través de Face ID, Touch ID o su código de acceso. DoneAt recibe el resultado de la autenticación, no tus datos biométricos o código de acceso. Esta protección se configura por separado en cada dispositivo.

## Servicios de terceros

DoneAt usa los siguientes servicios para alojar páginas, medir el sitio oficial y el temporizador web, distribuir apps y abrir enlaces que elijas:

- Vercel — alojamiento del sitio oficial y el temporizador web; medición de vistas de página y rendimiento en ambos
- Upstash — almacenamiento de conteos de eventos agregados diarios para el sitio oficial y el temporizador web
- GitHub — código fuente, información de versiones y comprobaciones de actualización para builds de escritorio distribuidas por GitHub
- Apple — distribución de apps, pagos de Plus y verificación de compras a través de App Store y StoreKit, y sincronización privada con iCloud cuando eliges activarla en iPhone o iPad
- Microsoft — distribución y actualizaciones para el listado de Microsoft Store que abras
- Un mirror de descarga de terceros, usado solo cuando lo eliges desde una build de escritorio distribuida por GitHub
- El servicio social de terceros que elijas al compartir una cuenta regresiva

## Eliminar tus datos

En el temporizador web, borra los datos de este sitio en tu navegador, incluyendo almacenamiento local y la cookie de idioma. En Mac o Windows, desinstala la app y elimina sus datos.

En iPhone y iPad, desinstalar elimina los datos almacenados en ese dispositivo. Si activaste la sincronización con iCloud, la copia privada de iCloud sigue disponible para tus otros dispositivos. Eliminar de iCloud en los ajustes de Registros y datos de DoneAt elimina la copia de iCloud y borra los registros sincronizados asociados en dispositivos conectados a esa cuenta de Apple cuando sincronicen. Eliminar registros solo de este dispositivo deja la copia de iCloud disponible para restaurar. Los archivos de respaldo que exportaste previamente deben eliminarse por separado de los lugares donde los guardaste o compartiste.

DoneAt no puede acceder a tu cuenta de Apple ni eliminar sus datos privados de iCloud en tu nombre. DoneAt tampoco puede acceder ni eliminar tus datos locales desde un servidor.

## Cambios a esta política

Cuando esta política se actualice, la fecha de última actualización en la parte superior de la página también se revisará. Los cambios importantes se listarán en las notas de la versión, y las versiones anteriores están disponibles en el historial de commits del repositorio de código abierto.

## Contáctanos

Las preguntas sobre esta política, o sobre cómo se maneja la información, van a [hello@doneat.app](mailto:hello@doneat.app). Los problemas de producto y sugerencias también pueden enviarse a través de [GitHub Issues](https://github.com/ififi2017/Off-Work-Countdown/issues).

Si identificas una diferencia entre esta política y el comportamiento real del producto, escribe a esa dirección o abre un issue.
