export const Admin = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    return (
        <div className="admin__panel-container">
            <h1 className="admin__panel-title">Panel de control</h1>

            <button className="admin__panel-button"
                onClick={handleLogout}
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          backgroundColor: '#ff4757',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Cerrar Sesión 🚪
      </button>
            
        </div>
    );

}