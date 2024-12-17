import { useState } from "react";

type RegisterFormProps = {
  onSubmit: (name: string, email: string, password: string, confirmPassword: string) => void;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, email, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-center h1 fw-bold mb-4">Regisztráció</p>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Név:
        </label>
        <input
          type="text"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Jelszó:
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">
          Jelszó újra:
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-check mb-4">
        <input className="form-check-input" type="checkbox" id="terms" required />
        <label className="form-check-label" htmlFor="terms">
          Elfogadom a <a href="/feltetelek">felhasználási feltételeket</a>
        </label>
      </div>
      <div className="text-center">
        <button type="submit" className="btn btn-warning px-4 py-2">
          Regisztrálok
        </button>
      </div>
    </form>
  );
}
