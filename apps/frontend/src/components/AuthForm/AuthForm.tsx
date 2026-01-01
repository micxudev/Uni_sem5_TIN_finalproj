interface AuthFormProps {
    labels: {
        username: string;
        password: string;
        submit: string;
    }
}

export function AuthForm({labels}: AuthFormProps) {
    return (
        <form className="auth-form">
            <label>
                <span>{labels.username}</span>
                <input type="text"/>
                <div className="field-error"></div>
            </label>

            <label>
                <span>{labels.password}</span>
                <input type="password"/>
                <div className="field-error"></div>
            </label>

            <button type="submit" className="auth-submit">{labels.submit}</button>
        </form>
    );
}