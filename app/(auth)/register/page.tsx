import RegisterForm from "./_components/register-form";

const RegisterPage = () => {
    return (
        <div className="w-1/2 ml-auto border-2 border-red-600 h-full">
            <div className="h-full w-full border-2 border-gray-500 flex justify-center items-center">
                <RegisterForm />
            </div>
        </div>
    );
}

export default RegisterPage;