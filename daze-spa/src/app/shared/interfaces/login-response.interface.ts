namespace Daze.Interfaces {

    export interface ILoginResponse {
        new_id: string;
        success: string;
        message: string;
        password: string;
    }
}