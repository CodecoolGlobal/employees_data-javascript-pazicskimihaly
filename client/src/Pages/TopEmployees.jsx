function TopEmployees() {
    const fetchTopEmployees = (signal) => {
        let Paid = fetch("/api/top-paid", { signal }).then((res) => res.json());
        console.log(Paid)
    };
    fetchTopEmployees()
}
export default TopEmployees