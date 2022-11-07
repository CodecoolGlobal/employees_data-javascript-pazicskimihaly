function TopEmployees() {
    const fetchTopEmployees = (signal) => {
        let Paid = fetch("/api/top-paid", { signal }).then((res) => res.json());
        Paid.then(console.log(Paid))
    };
    fetchTopEmployees()
}
export default TopEmployees