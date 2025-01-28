package com.example.parkingapp

import android.content.Intent
import android.os.Bundle
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject
import requestHelper.Constants

class ParkingActivity : AppCompatActivity() {

    private lateinit var lstParking: ListView
    private lateinit var txtcount: TextView
    private lateinit var btnNew: Button
    private lateinit var btnCalc: Button
    private var selectedRecordId: Int? = null
    private var recordIdMap = mutableMapOf<Int, Int>()  // Usamos Int en lugar de String para el recordId

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_parking)

        lstParking = findViewById(R.id.ls_parking)
        txtcount = findViewById(R.id.txt_count)
        btnNew = findViewById(R.id.btnNew)
        btnCalc = findViewById(R.id.btnCalc)

        // Cargar los datos del parking
        loadParking()

        // Manejar el evento de selección de un ítem en el ListView
        lstParking.setOnItemClickListener { parent, view, position, id ->
            selectedRecordId = recordIdMap[position]
        }

        btnNew.setOnClickListener {
            val intent = Intent(this, NewRecordActivity::class.java)
            startActivity(intent)
        }

        btnCalc.setOnClickListener {
            if (selectedRecordId != null) {
                calculateParking(selectedRecordId!!)
            } else {
                Toast.makeText(this, "Por favor, seleccione un registro de la lista", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun showPopup(message: String) {
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Confirmar Pago")
        builder.setMessage(message)

        builder.setPositiveButton("Pagar") { _, _ ->
            payParking(selectedRecordId!!)
            Toast.makeText(this, "Pago procesado satisfactoriamente", Toast.LENGTH_SHORT).show()
            selectedRecordId = null
            loadParking()
        }

        builder.setNegativeButton("No", null)
        builder.show()
    }

    private fun calculateParking(recordId: Int) {
        val url = Constants.PAYPARKING_URL

        // Crear el cuerpo de la solicitud JSON
        val requestBody = JSONObject().apply {
            put("recordId", recordId)
        }

        // Crear la solicitud POST
        val request = JsonObjectRequest(Request.Method.POST, url, requestBody,
            { response ->
                if (response.getBoolean("success")) {
                    val message = response.getString("message")
                    showPopup(message) // Mostrar el mensaje en el popup
                } else {
                    Toast.makeText(this, "Error al guardar los datos", Toast.LENGTH_SHORT).show()
                }
            },
            { error ->
                // Manejar errores de la solicitud
                Toast.makeText(this, "Error al realizar la solicitud: ${error.message}", Toast.LENGTH_SHORT).show()
            }
        )
        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }


    private fun payParking(recordId: Int) {
        val url = Constants.PAYPARKING_URL

        // Crear el cuerpo de la solicitud JSON
        val requestBody = JSONObject().apply {
            put("recordId", recordId)
        }
        val request = JsonObjectRequest(Request.Method.PUT, url, requestBody,
            { response ->
                if (response.getBoolean("success")) {
                    val message = response.getString("message")
                    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Error al guardar los datos", Toast.LENGTH_SHORT).show()
                }
            },
            { error ->
                // Manejar errores de la solicitud
                Toast.makeText(this, "Error al realizar la solicitud: ${error.message}", Toast.LENGTH_SHORT).show()
            }
        )
        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }

    private fun loadParking() {
        val url = Constants.VEHICLE_URL
        val request = JsonObjectRequest(Request.Method.GET, url, null,
            { response ->
                if (response.getBoolean("success")) {
                    val dataArray = response.getJSONArray("data")
                    val parkingList = mutableListOf<String>()

                    // Extraer datos del JSON y formatearlos
                    for (i in 0 until dataArray.length()) {
                        val item = dataArray.getJSONObject(i)
                        val recordId = item.getInt("recordId")
                        val vehicleInfo = """
                            Placa: ${item.getString("licenseplate")}
                            Registro: $recordId
                            Marca: ${item.getString("brand")}
                            Color: ${item.getString("color")}
                            Modelo: ${item.getString("model")}
                            Teléfono Cliente: ${item.getString("phoneCustomer")}
                            Cliente: ${item.getString("customer")}
                            Documento: ${item.getString("document")}
                            Hora de Entrada: ${item.getString("entrytime")}
                            Monto Cargado: ${item.getString("chargedamount")}
                            Estado: ${item.getString("status")}
                        """.trimIndent()
                        parkingList.add(vehicleInfo)
                        recordIdMap[parkingList.size - 1] = recordId  // Asociamos el recordId con la posición
                    }

                    val vehicleCount = parkingList.size
                    txtcount.text = "Vehículos parqueados: $vehicleCount"

                    // Crear y asignar el ArrayAdapter
                    val adapter = ArrayAdapter(
                        this,
                        android.R.layout.simple_list_item_1,
                        parkingList
                    )
                    lstParking.adapter = adapter
                } else {
                    Toast.makeText(this, "No se pudieron cargar los datos.", Toast.LENGTH_SHORT).show()
                }
            },
            { error ->
                Toast.makeText(this, "Error: ${error.message}", Toast.LENGTH_SHORT).show()
            }
        )

        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }
}
