import "./holdoversigt.scss";

export const metadata = {
  title: "Holdoversigt",
}
export default function Holdoversigt() {
    return (
        <>
        <div className="holdoversigt-container">
            <h1>Holdoversigt</h1>
            <div className="holdoversigt-empty">
                Ingen valgte aktiviteter
            </div>

        </div>
        </>
    )
}