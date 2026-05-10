interface FormFieldProps {
    label: string;
    name: string;
    type?: 'text' | 'number' | 'select' | 'textarea';
    options?: {
        label: string;
        value: any;
    }[];
    value: any;
    onChange: (value: any) => void;
    error?: string;
    required?: boolean;
}
export declare function FormField({ label, name, type, options, value, onChange, error, required }: FormFieldProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=FormField.d.ts.map