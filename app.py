import streamlit as st
import pandas as pd
import json
import random
import time

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
# TAB 4: SIMULADOR (PARTE 4) - PROXIMAMENTE
# ==========================================
with tabs[3]:
    st.warning("🚧 Simulador de Entrenamiento en construcción...")