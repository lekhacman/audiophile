import Navbar from "./Navbar.jsx";

export default function Page({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
