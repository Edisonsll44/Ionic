package com.example.parkingapp

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONObject
import requestHelper.Constants

class NewRecordActivity : AppCompatActivity() {
    private lateinit var editFirstName: EditText
    private lateinit var editLastName: EditText
    private lateinit var editIdDocument: EditText
    private lateinit var editPhoneNumber: EditText
    private lateinit var editLicensePlate: EditText
    private lateinit var editBrand: EditText
    private lateinit var editModel: EditText
    private lateinit var editColor: EditText
    private lateinit var buttonSave: Button
    private lateinit var buttonBack: Button

    private var isDataValid = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_new_record)

        // Inicialización de los campos y botones
        editFirstName = findViewById(R.id.editFirstName)
        editLastName = findViewById(R.id.editLastName)
        editIdDocument = findViewById(R.id.editIdDocument)
        editPhoneNumber = findViewById(R.id.editPhoneNumber)
        editLicensePlate = findViewById(R.id.editLicensePlate)
        editBrand = findViewById(R.id.editBrand)
        editModel = findViewById(R.id.editModel)
        editColor = findViewById(R.id.editColor)
        buttonSave = findViewById(R.id.buttonSave)
        buttonBack = findViewById(R.id.buttonBack)


        editIdDocument.setOnFocusChangeListener { view, hasFocus ->
            if (!hasFocus) { // Si el campo ha perdido el foco
                val documentId = editIdDocument.text.toString()

                // Llamar a la API pasando el valor del campo
                if (documentId.isNotEmpty()) {
                    fetchDocumentData(documentId)
                }
            }
        }


        // Botón "Grabar"
        buttonSave.setOnClickListener {
            val idDocument = editIdDocument.text.toString()
            val licensePlate = editLicensePlate.text.toString()
            val brand = editBrand.text.toString()
            val model = editModel.text.toString()
            val color = editColor.text.toString()
            val firstName = editFirstName.text.toString()
            val lastName = editLastName.text.toString()
            val phone = editPhoneNumber.text.toString()

            if (isDataValid && idDocument.isNotEmpty() && licensePlate.isNotEmpty() && brand.isNotEmpty() && model.isNotEmpty() && color.isNotEmpty()) {
                saveCustomerData(idDocument, licensePlate, brand, model, color)
            } else {
                createCustomerData(idDocument, licensePlate, brand, model, color, firstName, lastName,phone)
            }
            // Aquí se puede guardar el registro, por ejemplo, en una base de datos
            Toast.makeText(this, "Registro guardado", Toast.LENGTH_SHORT).show()
            clearAndEnableFields()
            val intent = Intent(this, ParkingActivity::class.java)
            startActivity(intent)
        }

        // Botón "Volver"
        buttonBack.setOnClickListener {
            clearAndEnableFields()
            val intent = Intent(this, ParkingActivity::class.java)
            startActivity(intent)
        }
    }

    // Función para realizar la solicitud GET a la API
    private fun fetchDocumentData(documentId: String) {
        val url = Constants.CUSTOMER_URL+"/"+documentId

        val request = JsonObjectRequest(
            Request.Method.GET, url, null,
            { response ->
                // Manejar la respuesta de la API
                if (response.getBoolean("success")) {
                    val data = response.getJSONObject("data")

                    // Solo mapear y bloquear los campos si los datos existen
                    if (data != null) {
                        editFirstName.setText(data.getString("firstname"))
                        editLastName.setText(data.getString("lastname"))
                        editIdDocument.setText(data.getString("iddocument"))
                        editPhoneNumber.setText(data.getString("phonenumber"))
                        editLicensePlate.setText(data.getString("licenseplate"))
                        editBrand.setText(data.getString("brand"))
                        editModel.setText(data.getString("model"))
                        editColor.setText(data.getString("color"))

                        // Deshabilitar los campos que no deben modificarse
                        editFirstName.isEnabled = false
                        editLastName.isEnabled = false
                        editPhoneNumber.isEnabled = false

                        isDataValid = true
                        // Mostrar mensaje de éxito
                        Toast.makeText(this, "Datos cargados correctamente", Toast.LENGTH_SHORT).show()
                    }
                }

            },
            { error ->
                // Manejar errores de la solicitud
                Toast.makeText(this, "Cliente no encontrado", Toast.LENGTH_SHORT).show()

                // Limpiar y habilitar los campos en caso de error de solicitud
                clearAndEnableFields()
            }
        )

        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }

    // Función para limpiar los campos y habilitarlos
    private fun clearAndEnableFields() {
        editFirstName.setText("")
        editLastName.setText("")
        editPhoneNumber.setText("")
        editLicensePlate.setText("")
        editBrand.setText("")
        editModel.setText("")
        editColor.setText("")

        // Habilitar los campos para que el usuario pueda ingresar los datos manualmente
        editFirstName.isEnabled = true
        editLastName.isEnabled = true
        editIdDocument.isEnabled = true
        editPhoneNumber.isEnabled = true
    }

    private fun saveCustomerData(idDocument: String, licensePlate: String, brand: String, model: String, color: String) {
        val url = Constants.CUSTOMER_URL

        // Crear el cuerpo de la solicitud JSON
        val requestBody = JSONObject().apply {
            put("iddocument", idDocument)
            put("licenseplate", licensePlate)
            put("brand", brand)
            put("model", model)
            put("color", color)
        }

        // Crear la solicitud POST
        val request = JsonObjectRequest(Request.Method.PUT, url, requestBody,
            { response ->
                if (response.getBoolean("success")) {
                    Toast.makeText(this, "Datos guardados correctamente", Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(this, "Error al guardar los datos", Toast.LENGTH_SHORT).show()
                }
            },
            { error ->
                // Manejar errores de la solicitud
                //Toast.makeText(this, "Error al realizar la solicitud: ${error.message}", Toast.LENGTH_SHORT).show()
            }
        )

        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }

    private fun createCustomerData(idDocument: String, licensePlate: String, brand: String, model: String, color: String,
                                   firstName: String, lastName: String, phone: String) {
        val url = Constants.CUSTOMER_URL

        // Crear el cuerpo de la solicitud JSON
        val requestBody = JSONObject().apply {
            put("iddocument", idDocument)
            put("licenseplate", licensePlate)
            put("brand", brand)
            put("model", model)
            put("color", color)
            put("firstname", firstName)
            put("lastname", lastName)
            put("phonenumber", phone)
        }

        // Crear la solicitud POST
        val request = JsonObjectRequest(Request.Method.POST, url, requestBody,
            { response ->
                // Manejar la respuesta de la API
                if (response.getBoolean("success")) {
                    Toast.makeText(this, "Datos guardados correctamente", Toast.LENGTH_SHORT).show()
                    // Aquí puedes agregar código para redirigir a otra pantalla o hacer algo más
                } else {
                    Toast.makeText(this, "Error al guardar los datos", Toast.LENGTH_SHORT).show()
                }
            },
            { error ->
                // Manejar errores de la solicitud
                //Toast.makeText(this, "Error al realizar la solicitud: ${error.message}", Toast.LENGTH_SHORT).show()
            }
        )

        // Añadir la solicitud a la cola de Volley
        Volley.newRequestQueue(this).add(request)
    }
}