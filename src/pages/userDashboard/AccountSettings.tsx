import NavigationBar from "../../components/Navbar"

const AccountSettings = () => {
  return (
    <div>
        <NavigationBar/>
        <section>
            <div id="dashboard">
                <div className="rounded-md py-2 px-2">
                    <h1 className="text-2xl font-bold text-center">Account Settings</h1>
                    <div className="grid col-span-3">
                        <div>
                            <h1>Profile</h1>
                        </div>
                        <div>
                            <h1>Orders</h1>
                        </div>
                        <div>
                            <h1>Payment Method</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AccountSettings