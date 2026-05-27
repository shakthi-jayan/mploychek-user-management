export const getDashboardData = async (req, res) => {
    try {
        res.status(200).json({
            totalRecords: 12,
            verifiedRecords: 8,
            pendingRecords: 4,
            verificationRecords: [
                {
                    verification: "Employment Check",
                    status: "Verified",
                    accessLevel: "General User"
                },
                {
                    verification: "Address Check",
                    status: "Pending",
                    accessLevel: "General User"
                }
            ]
        })
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Dashboard Error"
        })
    }
}
