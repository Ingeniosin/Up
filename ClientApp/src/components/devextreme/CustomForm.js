import React, {memo} from 'react';
import Form from "devextreme-react/form";
import {toast} from "react-hot-toast";

const setReference = (reference, instance) => {
    reference.current = ({
        instance: instance,
        getData: () => {
            const formData = instance.option('formData');
            for (const key in formData) {
                if (formData[key] instanceof Object && !(formData[key] instanceof Date)) {
                    formData[key] = formData[key].Id;
                }
                if (formData[key] === null || formData[key] === undefined) {
                    delete formData[key];
                }
            }
            return formData;
        },
        setData: (data) => instance.option('formData', data),
        isValid: () => {
            const valid = instance.validate().isValid;
            if (!valid) toast.error('Formulario invalido');
            return valid
        },
        get: (key) => instance.getEditor(key),
    })
}

const CustomForm = ({children, reference, formOptions, onEnterKey}) => {
    return (
        <Form  {...formOptions} labelMode={"floating"} onEditorEnterKey={onEnterKey}  onInitialized={({component: instance})  => {
            if (reference instanceof Array) reference.filter(x => x).forEach(ref => setReference(ref, instance));
            else setReference(reference, instance);
        }} >
            {children}
        </Form>
    );
};

export default memo(CustomForm);
