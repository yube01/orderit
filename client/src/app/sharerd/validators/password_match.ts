import { AbstractControl } from "@angular/forms"

export const passwordMatch = (passwordControlName:string,confirmedPasswordControlName:string)=>{
    const validator = (form:AbstractControl)=>{
        const passwordControl = form.get(passwordControlName)
        const confirmedPasswordControl = form.get(confirmedPasswordControlName)

        if(!passwordControl || !confirmedPasswordControl) return;

        if(passwordControl.value !== confirmedPasswordControl.value){

            confirmedPasswordControl.setErrors({notMatch:true})

        }else{
            const errors = confirmedPasswordControl.errors;
            if(!errors) return



            delete errors.notMatch
            confirmedPasswordControl.setErrors(errors)
        }



    }

    return validator

}