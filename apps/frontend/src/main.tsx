import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {App} from "./App";

import {I18nProvider} from "./contexts/I18nContext.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {ConfirmProvider} from "./contexts/ConfirmContext.tsx";
import {Slide, ToastContainer} from "react-toastify";

import "./styles/index.css";
import "./styles/variables.css";
import "./styles/toasts.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <I18nProvider>
            <AuthProvider>
                <ConfirmProvider>
                    <App/>
                    <ToastContainer
                        autoClose={3000}
                        pauseOnHover
                        theme="dark"
                        transition={Slide}
                    />
                </ConfirmProvider>
            </AuthProvider>
        </I18nProvider>
    </StrictMode>
);