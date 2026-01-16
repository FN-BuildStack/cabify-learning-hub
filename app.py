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

import plotly.express as px  # Asegúrate de que esto esté arriba con los imports

# ==========================================
# TAB 3: DASHBOARD PREDICTIVO (PARTE 3)
# ==========================================
with tabs[2]:
    st.header("📊 Torre de Control de Formación")
    st.markdown("Visibilidad en tiempo real del estado de certificación y riesgo de fuga.")

    # 1. GENERACIÓN DE DATOS (Simulamos conexión a Base de Datos)
    # Nota: En un caso real, esto vendría de SQL o BigQuery
    def obtener_data_analytics():
        data = []
        cohortes = ['Enero', 'Febrero', 'Marzo']
        for i in range(50):
            cohorte = random.choice(cohortes)
            nota = random.randint(50, 100)
            tiempo = random.randint(30, 180) # Minutos en plataforma
            
            # Lógica de Riesgo (Business Intelligence)
            riesgo = "Bajo"
            if nota < 70: riesgo = "Medio"
            if nota < 60 and tiempo < 60: riesgo = "Crítico"
            
            data.append({
                "Agente": f"AGT-{i:03d}",
                "Cohorte": cohorte,
                "Nota Final": nota,
                "Tiempo en Plataforma (min)": tiempo,
                "Nivel de Riesgo": riesgo,
                "Estado": "Certificado" if nota >= 80 else "En Proceso"
            })
        return pd.DataFrame(data)

    df = obtener_data_analytics()

    # 2. KPIs SUPERIORES (METRICAS CLAVE)
    kpi1, kpi2, kpi3, kpi4 = st.columns(4)
    
    certificados = df[df["Estado"]=="Certificado"].shape[0]
    en_riesgo = df[df["Nivel de Riesgo"]=="Crítico"].shape[0]
    promedio_nota = df["Nota Final"].mean()

    kpi1.metric("Total Agentes", len(df), "+5 nuevos")
    kpi2.metric("Tasa Certificación", f"{certificados/len(df)*100:.0f}%", "Objetivo: 85%")
    kpi3.metric("Riesgo de Fuga", en_riesgo, "-2 vs semana pasada", delta_color="inverse")
    kpi4.metric("Nota Promedio", f"{promedio_nota:.1f}", "+1.2 pts")

    st.markdown("---")

    # 3. GRÁFICOS INTERACTIVOS (PLOTLY)
    col_left, col_right = st.columns([2, 1])

    with col_left:
        st.subheader("🔍 Matriz de Rendimiento vs. Dedicación")
        # Gráfico de Dispersión: Muestra correlación entre estudiar y aprobar
        fig_scatter = px.scatter(
            df, 
            x="Tiempo en Plataforma (min)", 
            y="Nota Final", 
            color="Nivel de Riesgo",
            size="Nota Final",
            hover_data=["Agente", "Cohorte"],
            color_discrete_map={"Bajo": "#00CC96", "Medio": "#FFA15A", "Crítico": "#EF553B"},
            title="¿Quién está en riesgo de reprobar?"
        )
        st.plotly_chart(fig_scatter, use_container_width=True)

    with col_right:
        st.subheader("👥 Estado por Cohorte")
        # Gráfico de Barras Apiladas
        fig_bar = px.bar(
            df, 
            x="Cohorte", 
            color="Estado", 
            barmode="group",
            color_discrete_sequence=["#636EFA", "#AB63FA"],
            title="Avance de Grupos"
        )
        st.plotly_chart(fig_bar, use_container_width=True)

    # 4. TABLA DE DETALLE CON ALERTAS
    st.subheader("🚨 Agentes que requieren atención inmediata (Top 5 Riesgo)")
    df_critical = df[df["Nivel de Riesgo"] == "Crítico"].head(5)
    st.dataframe(
        df_critical.style.applymap(lambda x: 'color: red' if x == 'Crítico' else '', subset=['Nivel de Riesgo']),
        use_container_width=True
    )
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