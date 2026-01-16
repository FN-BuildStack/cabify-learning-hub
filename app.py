import streamlit as st

st.set_page_config(page_title="Cabify Automation Hub", layout="wide")

st.title("🚀 Cabify Automation Hub")
st.subheader("Plataforma de Formación Inteligente")

st.write("Estado del Sistema: **EN LINEA**")
st.info("Bienvenido al MVP de la prueba técnica. Navega por el menú lateral.")

# Sidebar temporal
with st.sidebar:
    st.header("Menú de Navegación")
    st.markdown("---")
    st.write("1. Arquitectura")
    st.write("2. IA Auditor")