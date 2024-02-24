import './App.css'
import {useCallback, useState} from "react";


interface TravelResponse {
    supplier: string;
    itemName: string;
    count: number;
    price: number;
}

function App() {
    const travels: Array<string> = [
        "WCZASY W BUŁGARII (7 DNI)",
        "WCZASY W CHORWACJI (7 DNI)",
        "WCZASY W EGIPCIE (7 DNI)",
        "WCZASY W GRECJI (7 DNI)",
        "WCZASY W RUMUNII (7 DNI)",
        "WCZASY W TURCJI (7 DNI)",
        "KRAJOWY OBÓZ JĘZYKOWY (14 DNI) - DLA MŁODZIEŻY",
        "KRAJOWY OBÓZ JEŹDZIECKI (14 DNI) - DLA MŁODZIEŻY",
        "KRAJOWY OBÓZ NARCIARSKI (7 DNI)",
        "KRAJOWA WYCIECZKA NAD MORZE (10 DNI)",
        "KRAJOWA WYCIECZKA W GÓRY (10 DNI)",
        "WYCIECZKA DO STOLICY EUROPEJSKIEJ (10 DNI)"
    ];

    const [quality, setQuality] = useState(1);
    const [clients, setClients] = useState(1);
    const [travel, setTravel] = useState(travels[0]);

    const [spinner, setSpinner] = useState(true);
    const [hideTable, setHideTable] = useState(true);
    const [response, setResponse] = useState<TravelResponse[]>([] as TravelResponse[]);
    const [totalPrice, setTotalPrice] = useState(0);

    const [notificationText, setNotificationText] = useState("");

    const findBestItems = useCallback(() => {
        setSpinner(false);
        setHideTable(true);

        fetch("http://localhost:8080/api/v1/item", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({travel, clients, quality})
        })
            .then(res => res.json())
            .then((res: TravelResponse[]) => {
                const sortedResponse = res.slice().sort((a, b) => a.supplier.localeCompare(b.supplier));
                const totalPrice = sortedResponse.reduce((sum, item) => sum + item.price, 0);

                setTotalPrice(totalPrice);
                setResponse(sortedResponse);
                setSpinner(true);
                setHideTable(false);
            })
            .catch(error => console.error("Error:", error));
    }, [travel, clients, quality]);

    return (
        <>
            <div>
                <div className="input-group mb-3 ms-auto me-auto" style={{width: "550px"}}>
                    <label className="input-group-text" htmlFor="travel">Wycieczka</label>
                    <select className="form-select" id="travel"
                            onChange={event => setTravel(travels[Number(event.target.value)])}>
                        {travels.map((value, index) => {
                            return <option key={index} value={index}>{value}</option>
                        })}
                    </select>
                </div>

                <div className="input-group mb-3 ms-auto me-auto" style={{width: "550px"}}>
                    <span className="input-group-text" id="inputGroup-sizing-default">Liczba klientów</span>
                    <input type="number" className="form-control" aria-label="number of clients" min={1}
                           defaultValue={clients}
                           onChange={event => setClients(Number(event.target.value))}
                           aria-describedby="inputGroup-sizing-default"/>
                </div>

                <div className="input-group mb-3 ms-auto me-auto" style={{width: "550px"}}>
                    <span className="input-group-text" id="inputGroup-sizing-default">Jakość</span>
                    <input type="number" className="form-control" aria-label="quality" min={1} max={3}
                           defaultValue={quality}
                           onChange={event => setQuality(Number(event.target.value))}
                           aria-describedby="inputGroup-sizing-default"/>
                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    style={{width: "100px"}}
                    onClick={() => findBestItems()}
                >Szukaj
                </button>
            </div>

            <div className="spinner-border mt-4" role="status" hidden={spinner}>
                <span className="visually-hidden">Loading...</span>
            </div>

            <div style={{
                borderRadius: "0.375rem",
                borderWidth: "1px",
                border: "solid #495057",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "10px",
                padding: "1.5rem",
                position: "relative",
                width: "1000px",
                fontSize: "17px"
            }} hidden={hideTable}>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Dostawca</th>
                        <th scope="col">Usługa</th>
                        <th scope="col">Liczba</th>
                        <th scope="col">Koszt</th>
                    </tr>
                    </thead>
                    <tbody>
                    {response.map((value, index) => {
                        return (
                            <tr key={index}>
                                <th scope={"row"}>{index + 1}</th>
                                <td>{value.supplier}</td>
                                <td style={{width: "10px"}}>
                                    <div className={"item-name"} onClick={() => {
                                        setNotificationText(value.itemName);

                                        navigator.clipboard.writeText(value.itemName).then(() => {});

                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-expect-error
                                        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(document.getElementById("liveToast"))
                                        toastBootstrap.show();
                                    }}>
                                        {value.itemName}
                                    </div>
                                </td>
                                <td>{value.count}</td>
                                <td>{value.price} PLN</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <p style={{marginLeft: "750px"}}>Łączny koszt: {totalPrice} PLN</p>
            </div>

            <div className="toast-container position-fixed bottom-0 end-0 p-3">
                <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Schowek</strong>
                        <small>Teraz</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Skopiowano <span style={{fontWeight: "bold"}}>{notificationText}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;
