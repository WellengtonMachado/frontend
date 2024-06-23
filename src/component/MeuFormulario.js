import React, { useState } from "react";
import "./MeuFormulario.css"

function MeuFormulario() {

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!form.nome) newErrors.nome = 'Nome é obrigatório.';
        if (!form.email) newErrors.email = 'Email é obrigatório.';
        if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email inválido.';
        if (form.email === 'teste@teste.com') newErrors.email = 'Email já está cadastrado.';
        if (!form.senha) newErrors.senha = 'Senha é obrigatória.';
        if (form.senha.length < 8) newErrors.senha = 'Senha deve ter pelo menos 8 caracteres.';
        if (!/[a-z]/.test(form.senha)) newErrors.senha = 'Senha deve conter pelo menos uma letra minúscula.';
        if (!/[A-Z]/.test(form.senha)) newErrors.senha = 'Senha deve conter pelo menos uma letra maiúscula.';
        if (!/[0-9]/.test(form.senha)) newErrors.senha = 'Senha deve conter pelo menos um numeral.';
        if (form.senha !== form.confirmacaoSenha) newErrors.confirmacaoSenha = 'Senhas não coincidem.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger;
        const newErrors = validate();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch('http://localhost:8080/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        '_x-api-key_': 'ECA1AB4CE8583613A2C759B445E98'
                    },
                    body: JSON.stringify(form)
                });

                const data = await response.json();

                if (data.erro) {
                    setMessage(`Erro: ${data.tipoErro}`);
                } else {
                    setMessage('Cadastro realizado com sucesso!');
                }
            } catch (error) {
                setMessage('Erro ao conectar com o servidor.');
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Cadastro</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome:</label>
                        <input type="text" className="form-control" name="nome" value={form.nome} onChange={handleChange} />
                        {errors.nome && <p>{errors.nome}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Senha:</label>
                        <input type="password" className="form-control" name="senha" value={form.senha} onChange={handleChange} />
                        {errors.senha && <p>{errors.senha}</p>}
                    </div>
                    <div className="form-group">
                        <label>Confirmação de Senha:</label>
                        <input type="password" className="form-control" name="confirmacaoSenha" value={form.confirmacaoSenha} onChange={handleChange} />
                        {errors.confirmacaoSenha && <p>{errors.confirmacaoSenha}</p>}
                    </div>
                    <button className="btn btn-primary" type="submit">Cadastrar</button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default MeuFormulario;