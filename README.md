# Sales Date Prediction

Aplicación web moderna desarrollada con Angular 19 y Tailwind CSS que permite gestionar órdenes de clientes y predecir fechas de futuras órdenes basándose en el análisis de patrones históricos.

## 📋 Características Principales

- **Predicción de Fechas de Ventas**: Calcula automáticamente cuándo ocurrirá la próxima orden por cliente
- **Gestión de Órdenes**: Visualización completa de órdenes existentes por cliente
- **Creación de Nuevas Órdenes**: Formulario intuitivo para crear órdenes con validaciones
- **Búsqueda y Filtrado**: Búsqueda en tiempo real desde el servidor
- **Paginación y Ordenamiento**: Tablas completamente interactivas
- **Interfaz Responsive**: Diseñada con Tailwind CSS

## 🏗️ Arquitectura

```
Frontend (Angular 19) 
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 22.12.0 y npm
- Angular CLI 20.1.4


### 2. Configuración del Backend (Web API)

```bash
cd SalesDatePrediction.API
dotnet restore
dotnet build

# Actualizar connection string en appsettings.json
# Ejecutar la aplicación
dotnet run
```

### 3. Configuración del Frontend (Angular)

```bash
cd sales-date-prediction-front
npm install

# Configurar la URL del API en environment.ts
# Ejecutar en modo desarrollo
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Backend
```bash
dotnet run             # Inicia la API
```

## 🛠️ Scripts Disponibles

### Frontend
```bash
npm start              # Inicia el servidor de desarrollo
npm run build          # Construye la aplicación para producción
npm run build:prod     # Build optimizado para producción
npm run test           # Ejecuta las pruebas unitarias
npm run lint           # Ejecuta el linter
npm run e2e            # Ejecuta las pruebas end-to-end
```

## 📁 Estructura del Proyecto

```
sales-date-prediction/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/
│   │   │   │   └── error.interceptor.ts      
│   │   │   └── services/
│   │   │       ├── common-http.service.ts 
│   │   │       ├── customer.service.ts    
│   │   │       ├── employee.service.ts   
│   │   │       ├── messages.service.ts   
│   │   │       ├── order.service.ts   
│   │   │       ├── product.service.ts
│   │   │       └── shipper.service.ts
│   │   ├── modules/
│   │   │   ├── d3-chart/
│   │   │   ├── new-order/                      
│   │   │   ├── orders-view/                    
│   │   │   └── sales-prediction
│   │   └── shared/
│   │       ├── assets/
│   │       │   └── graphing-with-d3.html       
│   │       └── models/
│   │           ├── category.model.ts
│   │           ├── customer.model.ts
│   │           ├── employee.model.ts
│   │           ├── order-detail.model.ts
│   │           ├── order.model.ts
│   │           ├── product.model.ts
│   │           ├── shipper.model.ts
│   │           └── supplier.model.ts
│   └── environments/
├── angular.json
└── package.json
```

## 🎯 Funcionalidades Implementadas

### Sales Date Prediction View (Vista Principal)
- ✅ Configurada como página de inicio
- ✅ Tabla con paginación y ordenamiento
- ✅ Búsqueda filtrada desde servidor
- ✅ Botones "VIEW ORDERS" y "NEW ORDER" por cliente
- ✅ Responsive design con Tailwind CSS

### Orders View (Modal de Órdenes)
- ✅ Modal que muestra órdenes del cliente seleccionado
- ✅ Tabla con paginación y ordenamiento
- ✅ Diseño fiel al mockup proporcionado

### New Order Form (Formulario Nueva Orden)
- ✅ Formulario reactivo con validaciones
- ✅ Selección de empleados, transportistas y productos
- ✅ Validación de tipos de datos y campos requeridos
- ✅ Un producto por orden según especificaciones

### D3 Chart View (Vista Embebida)
- ✅ Funcionalidad para crear un gráfico de barras utilizando D3.js
- ✅ Permite ingresar datos numéricos y visualizar un gráfico en tiempo real

## 🔧 Configuración del Entorno

### Variables de Entorno (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api',
  enableLogging: true
};
```
## 🧪 Pruebas

### Backend
- **Unitarias**: xUnit + Moq
- **Integración**: Testing con base de datos en local
- **Cobertura**: >85% en servicios y controladores

```bash
# Ejecutar todas las pruebas
npm run test:all
dotnet test --collect:"XPlat Code Coverage"
```

## 📊 APIs Implementadas

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/Employees` | GET | Lista todos los empleados |
| `/api/Orders/CustomerId/{customerId}` | GET | Órdenes por cliente específico |
| `/api/Orders` | POST | Crear nueva orden |
| `/api/Products` | GET | Lista todos los productos |
| `/api/Shippers` | GET | Lista todos los transportistas |

## 🎨 Decisiones de Diseño

### Frontend
- **Angular 19**: Aprovecha las últimas características como signals y control flow
- **Tailwind CSS**: Diseño utility-first para desarrollo rápido y consistente
- **Reactive Forms**: Validaciones robustas y experiencia de usuario fluida
- **Lazy Loading**: Optimización de rendimiento en la carga de módulos

## 🔍 Consideraciones de Rendimiento

- **Paginación del lado del servidor**: Manejo eficiente de grandes volúmenes de datos
- **Lazy loading de modales**: Carga componentes solo cuando se necesitan
- **OnPush Change Detection**: Optimización en la detección de cambios

## 🚦 Estado del Proyecto

- ✅ Base de datos configurada y poblada localmente
- ✅ Web API con todos los endpoints funcionales
- ✅ Frontend con todas las vistas implementadas
- ✅ Pruebas unitarias cubren funcionalidad crítica
- ✅ Documentación completa de APIs
- ✅ Responsive design implementado

## 📝 Notas Adicionales

- La predicción de fechas utiliza el promedio de días entre órdenes históricas
- El formulario de nueva orden está limitado a un producto por orden según especificaciones
- La búsqueda en la tabla principal por nombre de cliente se ejecuta del lado del servidor para optimizar rendimiento

## 👥 Autores

- **Fernando Ibáñez** - *Desarrollo inicial* - [fernando-ibz](https://github.com/fernando-ibz)

## 🙏 Agradecimientos

- Entity Framework Core Team
- .NET Community
- Swagger/OpenAPI Initiative

## 📞 Soporte

¿Tienes preguntas o problemas? 
- 📧 Email: fernando.ibz.g@gmail.com

---

⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!