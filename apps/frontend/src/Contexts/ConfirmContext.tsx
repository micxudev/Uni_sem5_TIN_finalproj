import {createContext, type ReactNode, useContext, useState} from "react";
import {ConfirmModal} from "../components/ConfirmModal/ConfirmModal.tsx";

type ConfirmProps = {
    title: string;
    text: string;
    confirm: string;
    cancel: string;
};

type ConfirmFn = (props: ConfirmProps) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({children}: { children: ReactNode }) {
    const [state, setState] = useState<{
        props: ConfirmProps;
        resolve: (value: boolean) => void;
    } | null>(null);

    const confirm = (props: ConfirmProps) => {
        return new Promise<boolean>(resolve => {
            setState({props: props, resolve});
        });
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            {state && (
                <ConfirmModal
                    labels={state.props}
                    onConfirmClick={() => {
                        state.resolve(true);
                        setState(null);
                    }}
                    onCancelClick={() => {
                        state.resolve(false);
                        setState(null);
                    }}
                />
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);
    if (!ctx) {
        throw new Error("useConfirm must be used inside ConfirmProvider");
    }
    return ctx;
}