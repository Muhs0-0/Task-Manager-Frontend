import logo from "../assets/logo.jpg"

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Qorsheye</h1>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: 'black',
    padding: '1rem 2rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom:"3rem"
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    justifyContent: 'start', // center logo + text together
  },
  logo: {
    height: '40px',
    width: '40px',
    objectFit: 'cover',
    borderRadius: '8px',

  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '1.8rem',
    fontFamily: 'Segoe UI, sans-serif',
    letterSpacing: '0.5px',
  },
};
