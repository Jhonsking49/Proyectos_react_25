# Peticiones a la API del backend

- POST /api/auth/register → Registro de usuario.
    { "username": "", "password":"" }
- POST /api/auth/login → Inicio de sesión con JWT (almacenado en HTTPOnly cookie).
- POST /api/auth/logout → Cierre de sesión.
- POST /api/auth/check-auth → Verificar si estoy logueado actualmente.
- POST /api/users/me → Información del usuario que está logueado actualmente.