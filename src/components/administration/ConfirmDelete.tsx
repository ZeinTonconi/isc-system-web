interface RoleProps {
    roleName: string
    setShowDelete: (it: boolean) => void;
}

const ConfirmDelete = (props: RoleProps) => {
    return (
        <div className="flex absolute  items-center justify-center inset-0  bg-gradient-to-tr from-[#39414E]/90 from-40% via-50%  to-[#39414E]/95 to-55% via-[#272F3C]/90  z-50 bg-opacity-55">
            {" "}
            <div className="flex flex-col justify-center bg-white m-5 p-5 shadow-md rounded-lg h-fit lg:w-1/3 md:w-1/2 sm:w-1/2">
                <label className="txt-modal">Eliminando Rol</label>
                <label className="txt2-modal ">
                    ¿Está seguro de eliminar el rol de {props.roleName}?
                </label>
                <label className="txt3-modal">
                    No podrá recuperar los datos una vez que continue
                </label>
                <div className="flex flex-row justify-between w-full px-5 md:px-2">
                    <button
                        className="btn2-cancel"
                        onClick={() => {
                            props.setShowDelete(false)
                        }}>
                        Cancelar
                    </button>
                    <button
                        className="btn"
                        onClick={() => {
                            props.setShowDelete(false)
                        }}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete