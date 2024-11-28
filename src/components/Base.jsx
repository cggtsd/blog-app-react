export const Base = ({title="Welcome to Website",children}) => {
    
    return (
        <div className="container-fluid p-0 m-0">
        {/* <h1>This is header</h1> */}
            {children}
        {/* <h1>This is footer</h1> */}
        </div>
    )
}