import streamlit as st
import pandas as pd
import json
import random
import time

# --- INICIALIZAR ESTADO DEL SIMULADOR ---
if 'simulacion_activa' not in st.session_state:
    st.session_state['simulacion_activa'] = False
if 'paso_actual' not in st.session_state:
    st.session_state['paso_actual'] = 0
if 'puntaje' not in st.session_state:
    st.session_state['puntaje'] = 0

# Configuración de la página
st.set_page_config(page_title="Cabify Automation Hub", layout="wide", page_icon="🚗")

# --- CSS para que se parezca a Cabify (Morado) ---
st.markdown("""
    <style>
    .stApp {background-color: #f5f5f5;}
    .main-header {color: #6e41e2; font-family: 'Helvetica', sans-serif;}
    .stButton>button {background-color: #6e41e2; color: white; border-radius: 8px;}
    </style>
    """, unsafe_allow_html=True)

# --- HEADER ---
col1, col2 = st.columns([1, 5])
with col1:
    # Puedes poner el logo de Cabify si consigues la URL, si no un emoji
    st.markdown("<h1>🟣</h1>", unsafe_allow_html=True)
with col2:
    st.markdown("<h1 class='main-header'>Cabify Automation Hub</h1>", unsafe_allow_html=True)
    st.caption("Sistema Integrado de Gestión de Formación y Calidad (MVP)")

# --- NAVEGACIÓN ---
tabs = st.tabs(["🏠 Inicio", "🤖 IA Auditor (Parte 2)", "📊 Dashboard (Parte 3)", "🎮 Simulador (Parte 4)"])

# ==========================================
# TAB 1: INICIO
# ==========================================
with tabs[0]:
    st.write("### Bienvenido al Ecosistema de Automatización")
    st.write("""
    Esta plataforma centraliza el ciclo de vida del agente:
    1.  **Ingesta Automática:** Conexión con Confluence y ClickUp.
    2.  **Auditoría Cognitiva:** Uso de LLMs para evaluar calidad en tiempo real.
    3.  **Visión 360:** Dashboards predictivos de riesgo y performance.
    4.  **Entrenamiento:** Simuladores interactivos.
    """)
    st.info("👈 Selecciona una pestaña arriba para navegar por los módulos.")

# ==========================================
# TAB 2: IA AUDITOR (PARTE 2) - EL CEREBRO
# ==========================================
with tabs[1]:
    st.header("Auditoría de Calidad con IA (NLP)")
    st.markdown("Pega aquí el chat del agente (del Excel) para analizarlo en tiempo real.")

    col_input, col_output = st.columns(2)

    with col_input:
        chat_input = st.text_area("Pegar Chat aquí:", height=300, placeholder="Ej: Ingrid Arias: Hola, han pasado 3 minutos...")
        
        # Botón de Análisis
        analizar_btn = st.button("🔍 Auditar Chat con IA")

    with col_output:
        if analizar_btn and chat_input:
            with st.spinner("Procesando análisis semántico..."):
                time.sleep(1.5) # Simulación de delay de API
                
                # --- AQUÍ IRÍA LA LLAMADA A OPENAI REAL ---
                # Como no queremos gastar créditos aún, usamos la lógica SIMULADA basada en tus datos
                
                score_empatia = 0
                score_solucion = 0
                feedback = []
                alertas = []

                # Lógica "Fake-Intelligent" para la demo
                chat_lower = chat_input.lower()
                
                # 1. Análisis de Empatía
                if "lamento" in chat_lower or "entiendo" in chat_lower or "disculpa" in chat_lower:
                    score_empatia = 90
                    feedback.append("✅ Uso correcto de palabras de empatía.")
                elif "calma" in chat_lower:
                    score_empatia = 40
                    feedback.append("❌ Se detectó la palabra 'Calma', lo cual invalida al usuario.")
                    alertas.append("Tono Condescendiente")
                else:
                    score_empatia = 60
                    feedback.append("⚠️ Falta calidez en el saludo o despedida.")

                # 2. Análisis de Silencios (Detectado del Excel)
                if "han pasado tres minutos" in chat_lower:
                    alertas.append("⏱️ ALERTA CRÍTICA: Silencio prolongado detectado (>3 min).")
                    score_solucion = 50
                else:
                    score_solucion = 100
                    feedback.append("✅ Tiempos de respuesta óptimos.")

                # Mostramos resultados visuales
                st.subheader("Resultado de la Auditoría")
                
                # Métricas
                c1, c2 = st.columns(2)
                c1.metric("Score Empatía", f"{score_empatia}/100", delta_color="normal" if score_empatia > 70 else "inverse")
                c2.metric("Score Procesos", f"{score_solucion}/100", delta_color="normal" if score_solucion > 80 else "inverse")

                if alertas:
                    st.error(f"🚨 ALERTAS DETECTADAS: {', '.join(alertas)}")
                
                st.write("#### 📝 Feedback Generado:")
                for f in feedback:
                    st.write(f)
                
                st.json({
                    "agente_id": "Unknown",
                    "sentimiento_cliente": "Negativo" if score_empatia < 50 else "Positivo",
                    "requiere_reentrenamiento": True if score_empatia < 70 else False
                })

# ==========================================
# TAB 3: DASHBOARD (PARTE 3) - PROXIMAMENTE
# ==========================================
with tabs[2]:
    st.warning("🚧 Módulo de Dashboards Predictivos en construcción...")

# ==========================================
# TAB 4: SIMULADOR GAMIFICADO (PARTE 4)
# ==========================================
with tabs[3]:
    st.header("🎮 Cabify Learning: Simulador de Operaciones")
    st.markdown("Entrenamiento práctico: Resuelve el caso en menos de 2 minutos.")

    # Datos del Escenario (Hardcoded para el MVP)
    escenario = {
        "contexto": "CONTEXTO: Un conductor (Dylan) escribe furioso porque se le cobró una tasa de servicio que considera injusta. Tu objetivo es calmarlo y validar su identidad.",
        "chat_inicial": "DYLAN: ¡Son unos ladrones! Me descontaron $500 y yo no hice ese viaje. Quiero mi dinero YA o los denuncio.",
        "pasos": [
            {
                "pregunta": "¿Qué respondes primero?",
                "opciones": {
                    "A": "Hola Dylan, cálmate. Nadie te está robando.",
                    "B": "Hola Dylan, entiendo tu molestia. Para ayudarte, por favor confírmame tu placa y fecha del viaje.",
                    "C": "Debes enviar un correo a soporte@cabify.com, por aquí no veo eso."
                },
                "correcta": "B",
                "feedback_error": "❌ Error: La opción A es condescendiente ('cálmate') y la C es burocracia ('envía un correo'). Debes mostrar empatía y validar datos (Opción B).",
                "feedback_acierto": "✅ ¡Excelente! Empatía + Validación de seguridad."
            },
            {
                "pregunta": "Dylan responde: 'Mi placa es ABC-123. Fue ayer a las 3pm.' (Ves en el sistema que el cobro es correcto por una cancelación tardía). ¿Qué haces?",
                "opciones": {
                    "A": "Ah, es que cancelaste tarde. Es culpa tuya. Lee los términos.",
                    "B": "Veo el cobro. Corresponde a una cancelación fuera de tiempo, pero como es tu primera vez, lo devolveré como excepción.",
                    "C": "Te he devuelto el dinero. ¿Algo más?"
                },
                "correcta": "B",
                "feedback_error": "❌ Error: La opción A es agresiva. La C es robótica. La B educa al usuario y fideliza (Customer Love).",
                "feedback_acierto": "✅ ¡Perfecto! Educaste al usuario sobre la norma pero diste una solución (Wow experience)."
            }
        ]
    }

    # --- INTERFAZ DEL JUEGO ---
    
    col_juego, col_stats = st.columns([2, 1])

    with col_stats:
        st.write("### 🏆 Tu Progreso")
        st.metric("Puntaje Actual", f"{st.session_state['puntaje']} pts")
        if st.session_state['simulacion_activa']:
            st.info(f"Escena {st.session_state['paso_actual'] + 1} de {len(escenario['pasos'])}")

    with col_juego:
        if not st.session_state['simulacion_activa']:
            st.info(escenario['contexto'])
            if st.button("▶️ INICIAR SIMULACIÓN"):
                st.session_state['simulacion_activa'] = True
                st.session_state['paso_actual'] = 0
                st.session_state['puntaje'] = 0
                st.rerun()
        
        else:
            # Mostrar chat del cliente
            with st.chat_message("user", avatar="😠"):
                if st.session_state['paso_actual'] == 0:
                    st.write(escenario['chat_inicial'])
                else:
                    st.write("DYLAN: (Esperando solución...)")

            # Mostrar pregunta actual
            paso = escenario['pasos'][st.session_state['paso_actual']]
            st.write(f"**Decisión {st.session_state['paso_actual'] + 1}:** {paso['pregunta']}")

            # Botones de respuesta
            c1, c2, c3 = st.columns(3)
            
            # Lógica para evitar clicks múltiples
            def responder(opcion):
                if opcion == paso['correcta']:
                    st.toast(paso['feedback_acierto'], icon="✅")
                    st.session_state['puntaje'] += 50
                    time.sleep(1)
                else:
                    st.toast(paso['feedback_error'], icon="❌")
                    st.error(paso['feedback_error'])
                    time.sleep(2)
                
                # Avanzar o Terminar
                if st.session_state['paso_actual'] < len(escenario['pasos']) - 1:
                    st.session_state['paso_actual'] += 1
                else:
                    st.session_state['simulacion_activa'] = False
                    st.balloons()
                    st.success(f"🎉 ¡Simulación Terminada! Puntaje Final: {st.session_state['puntaje']}/100")
                
                st.rerun()

            if c1.button(f"A) {paso['opciones']['A'][:30]}..."): responder("A")
            if c2.button(f"B) {paso['opciones']['B'][:30]}..."): responder("B")
            if c3.button(f"C) {paso['opciones']['C'][:30]}..."): responder("C")