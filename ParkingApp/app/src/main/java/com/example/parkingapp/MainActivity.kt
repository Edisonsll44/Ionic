package com.example.parkingapp

import android.content.Intent
import android.os.Bundle
import android.text.TextUtils
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import org.json.JSONObject
import requestHelper.Constants

class MainActivity : AppCompatActivity() {
    private lateinit var txt_user: EditText
    private lateinit var txt_password: EditText
    private lateinit var btn_Login: Button
    private lateinit var requestHelper: RequestHelper

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        txt_user = findViewById(R.id.editTextUsername)
        txt_password = findViewById(R.id.editTextPassword)
        btn_Login = findViewById(R.id.buttonLogin)

        // Crear una instancia de RequestHelper
        requestHelper = RequestHelper(this)

        btn_Login.setOnClickListener {
            validateInputs()
        }
    }

    private fun validateInputs() {
        val username = txt_user.text.toString().trim()
        val password = txt_password.text.toString().trim()

        // Validar que el nombre de usuario sea un correo electrónico válido
        if (TextUtils.isEmpty(username) || !username.matches(Regex("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"))) {
            txt_user.error = "El usuario debe ser un correo electrónico válido."
            return
        }

        // Validar que la contraseña contenga letras y números
        if (TextUtils.isEmpty(password) || !password.matches(Regex("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$"))) {
            txt_password.error = "La contraseña debe contener letras y números."
            return
        }

        loginUser(username, password)
    }

    private fun loginUser(username: String, password: String) {
        val url = Constants.LOGIN_URL

        // Crear el objeto JSON para el cuerpo de la solicitud
        val jsonBody = JSONObject()
        jsonBody.put("email", username)
        jsonBody.put("password", password)

        // Usar RequestHelper para hacer la solicitud
        requestHelper.makeJsonRequest(
            url,
            Request.Method.POST,
            jsonBody,
            objectListener = { response -> handleLoginResponse(response) },
            errorListener = { error -> requestHelper.handleError(error) }
        )
    }

    private fun handleLoginResponse(response: JSONObject) {
        val success = response.getBoolean("success")
        val message = response.getString("message")

        if (success) {
            Toast.makeText(this, "Inicio de sesión exitoso", Toast.LENGTH_SHORT).show()
            val intent = Intent(this, ParkingActivity::class.java)
            startActivity(intent)
        } else {
            Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
        }
    }
}