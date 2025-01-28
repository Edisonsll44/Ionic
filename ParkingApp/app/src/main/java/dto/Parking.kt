package dto

data class ParkingDto(
    val licenseplate: String,
    val brand: String,
    val color: String,
    val model: String,
    val phoneCustomer: String,
    val customer: String,
    val document: String,
    val entrytime: String,
    val exittime: String?,
    val chargedamount: String,
    val status: String
)
