import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

# ==============================================================================
# 1. CONFIGURACIÓN DE PÁGINA Y ESTILOS
# ==============================================================================
st.set_page_config(
    page_title="Cabify Training Analytics",
    page_icon="📊",
    layout="wide"
)

# Colores Corporativos Cabify
COLOR_MORADUL = "#7145D6"
COLOR_VERDE = "#00CC96"
COLOR_ROJO = "#EF553B"
COLOR_GRIS = "#F5F5F5"
COLOR_TEXTO = "#333333"

# Estilos CSS personalizados para "look & feel" corporativo
st.markdown("""
<style>
    .stApp { background-color: #FAFAFA; }
    div[data-testid="stMetricValue"] { font-size: 24px; color: #7145D6; }
    h1, h2, h3 { font-family: 'Poppins', sans-serif; color: #333333; }
    .css-1d391kg { padding-top: 1rem; }
</style>
""", unsafe_allow_html=True)

# ==============================================================================
# 2. GENERADOR DE DATOS MOCK (Simulación de Base de Datos)
# ==============================================================================
@st.cache_data
def get_mock_data():
    """Genera un DataFrame simulado de 500 intentos de cursos."""
    np.random.seed(42) # Para que los datos sean siempre iguales
    
    agents = [f"Agente {i:03d}" for i in range(1, 51)]
    teams = ["Soporte L1", "Soporte L2", "Onboarding", "VIP Support"]
    modules = [
        "01. Cultura Cabify", 
        "02. Protocolo Objetos Perdidos", 
        "03. Gestión de Reembolsos", 
        "04. Seguridad Vial"
    ]
    
    data = []
    
    # Generamos 500 registros históricos
    for _ in range(500):
        agent = np.random.choice(agents)
        team = np.random.choice(teams, p=[0.4, 0.2, 0.3, 0.1]) # L1 es el más grande
        module = np.random.choice(modules)
        
        # Simulación de puntaje (más probable sacar notas altas)
        score = min(100, int(np.random.normal(75, 15)))
        score = max(0, score)
        
        # Estado basado en nota
        status = "Aprobado" if score >= 80 else "Reprobado"
        
        # Tiempo en minutos (correlación inversa leve con nota: muy rápido = mala nota)
        time_spent = int(np.random.normal(8, 2)) 
        if score < 50: time_spent = int(np.random.normal(3, 1)) # Lo hizo muy rápido y falló
        
        date = datetime(2025, 1, 1) + timedelta(days=np.random.randint(0, 60))
        
        data.append([agent, team, module, score, status, time_spent, date])
        
    df = pd.DataFrame(data, columns=["Agente", "Equipo", "Módulo", "Nota", "Estado", "Tiempo (min)", "Fecha"])
    return df

# Cargar datos
df = get_mock_data()

# ==============================================================================
# 3. SIDEBAR Y NAVEGACIÓN
# ==============================================================================
st.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Cabify_Logo.svg/1200px-Cabify_Logo.svg.png", width=150)
st.sidebar.title("Training Analytics")
st.sidebar.markdown("---")

view_mode = st.sidebar.radio(
    "Seleccionar Vista:",
    ["📊 Visión Global (Manager)", "👤 Reporte Individual (Agente)", "📚 Análisis de Contenido"]
)

st.sidebar.markdown("---")
st.sidebar.info("**Nota:** Datos simulados para demostración técnica de la Fase 3.")

# ==============================================================================
# VISTA 1: VISIÓN GLOBAL (MANAGER)
# ==============================================================================
if view_mode == "📊 Visión Global (Manager)":
    st.title("📊 Dashboard Ejecutivo de Formación")
    st.markdown("Visión consolidada del rendimiento operativo y adherencia a la formación.")

    # Filtros Superiores
    col_f1, col_f2, col_f3 = st.columns(3)
    with col_f1:
        team_filter = st.multiselect("Filtrar por Equipo:", options=df["Equipo"].unique(), default=df["Equipo"].unique())
    
    # Aplicar filtro
    df_filtered = df[df["Equipo"].isin(team_filter)]

    # --- ROW 1: KPIs Principales ---
    kpi1, kpi2, kpi3, kpi4 = st.columns(4)
    
    total_agents = df_filtered["Agente"].nunique()
    avg_score = df_filtered["Nota"].mean()
    pass_rate = (df_filtered[df_filtered["Estado"]=="Aprobado"].shape[0] / df_filtered.shape[0]) * 100
    total_hours = (df_filtered["Tiempo (min)"].sum()) / 60

    kpi1.metric("Agentes Activos", f"{total_agents}", "+5 this week")
    kpi2.metric("Nota Promedio Global", f"{avg_score:.1f}/100", f"{avg_score - 70:.1f} vs Target")
    kpi3.metric("Tasa de Aprobación", f"{pass_rate:.1f}%", "-2% vs last month", delta_color="inverse")
    kpi4.metric("Horas de Formación", f"{total_hours:.1f} hrs")

    st.markdown("---")

    # --- ROW 2: Gráficos Principales ---
    c1, c2 = st.columns([2, 1])

    with c1:
        st.subheader("Rendimiento por Módulo y Equipo")
        # Gráfico de Barras Agrupado
        fig_bar = px.box(df_filtered, x="Módulo", y="Nota", color="Equipo", 
                         color_discrete_sequence=[COLOR_MORADUL, "#9B7EDE", "#C5B3E8", "#333333"])
        fig_bar.update_layout(paper_bgcolor="rgba(0,0,0,0)", plot_bgcolor="rgba(0,0,0,0)")
        st.plotly_chart(fig_bar, use_container_width=True)

    with c2:
        st.subheader("Distribución Aprobados")
        # Donut Chart
        status_counts = df_filtered["Estado"].value_counts().reset_index()
        status_counts.columns = ["Estado", "Count"]
        fig_pie = px.donut(status_counts, values="Count", names="Estado", hole=0.6,
                           color="Estado", color_discrete_map={"Aprobado": COLOR_VERDE, "Reprobado": COLOR_ROJO})
        st.plotly_chart(fig_pie, use_container_width=True)

    # --- ROW 3: Evolución Temporal ---
    st.subheader("Tendencia de Certificaciones (Últimos 60 días)")
    daily_cert = df_filtered[df_filtered["Estado"] == "Aprobado"].groupby("Fecha").size().reset_index(name="Certificaciones")
    fig_line = px.line(daily_cert, x="Fecha", y="Certificaciones", markers=True)
    fig_line.update_traces(line_color=COLOR_MORADUL, line_width=3)
    st.plotly_chart(fig_line, use_container_width=True)

# ==============================================================================
# VISTA 2: REPORTE INDIVIDUAL (AGENTE)
# ==============================================================================
elif view_mode == "👤 Reporte Individual (Agente)":
    st.title("👤 Ficha de Rendimiento Individual")
    
    # Selector de Agente
    selected_agent = st.selectbox("Buscar Agente:", df["Agente"].unique())
    
    # Filtrar datos del agente
    agent_data = df[df["Agente"] == selected_agent]
    
    # Layout de Perfil
    col_profile, col_stats = st.columns([1, 3])
    
    with col_profile:
        st.markdown(f"""
        <div style="background-color: white; padding: 20px; border-radius: 10px; border: 1px solid #ddd; text-align: center;">
            <h2 style="color: #7145D6; margin:0;">{selected_agent}</h2>
            <p style="color: grey;">{agent_data.iloc[0]['Equipo']}</p>
            <hr>
            <h1>{agent_data['Nota'].mean():.0f}</h1>
            <p>Score Promedio</p>
        </div>
        """, unsafe_allow_html=True)
        
    with col_stats:
        # Spider Chart (Radar de Habilidades simulado)
        categories = ['Conocimiento Técnico', 'Empatía', 'Velocidad', 'Cumplimiento', 'Seguridad']
        # Simulamos skills basados en su nota promedio
        base_skill = agent_data['Nota'].mean() / 10
        r_values = [
            min(10, base_skill + np.random.randint(-1, 2)),
            min(10, base_skill + np.random.randint(-2, 3)),
            min(10, base_skill + np.random.randint(-1, 2)),
            min(10, base_skill + np.random.randint(-1, 2)),
            min(10, base_skill + np.random.randint(-1, 2))
        ]
        
        fig_radar = go.Figure()
        fig_radar.add_trace(go.Scatterpolar(
            r=r_values,
            theta=categories,
            fill='toself',
            name=selected_agent,
            line_color=COLOR_MORADUL
        ))
        fig_radar.add_trace(go.Scatterpolar(
            r=[8, 8, 8, 8, 8],
            theta=categories,
            fill='toself',
            name='Promedio Equipo',
            line_color='lightgrey',
            opacity=0.5
        ))
        fig_radar.update_layout(polar=dict(radialaxis=dict(visible=True, range=[0, 10])), showlegend=True, height=300)
        st.plotly_chart(fig_radar, use_container_width=True)

    # Tabla de Historial
    st.subheader("Historial de Módulos")
    
    def color_status(val):
        color = '#d4edda' if val == 'Aprobado' else '#f8d7da'
        text_color = '#155724' if val == 'Aprobado' else '#721c24'
        return f'background-color: {color}; color: {text_color}'

    st.dataframe(
        agent_data[["Módulo", "Fecha", "Tiempo (min)", "Nota", "Estado"]]
        .sort_values("Fecha", ascending=False)
        .style.applymap(color_status, subset=['Estado']),
        use_container_width=True
    )

# ==============================================================================
# VISTA 3: ANÁLISIS DE CONTENIDO
# ==============================================================================
elif view_mode == "📚 Análisis de Contenido":
    st.title("📚 Efectividad del Contenido Formativo")
    st.markdown("Análisis para detectar módulos difíciles o con tiempos de lectura anómalos.")

    c1, c2 = st.columns(2)
    
    with c1:
        st.subheader("Dificultad por Módulo (Tasa de Reprobación)")
        # Calcular tasa de fallo por módulo
        fail_rates = df.groupby("Módulo").apply(lambda x: (x[x["Estado"]=="Reprobado"].shape[0] / x.shape[0])*100).reset_index(name="Tasa de Fallo")
        
        fig_fail = px.bar(fail_rates, x="Tasa de Fallo", y="Módulo", orientation='h', 
                          text_auto='.1f', color="Tasa de Fallo", color_continuous_scale="Reds")
        fig_fail.update_layout(xaxis_title="% Reprobación")
        st.plotly_chart(fig_fail, use_container_width=True)
        st.info("💡 **Insight:** El 'Protocolo de Objetos Perdidos' tiene la tasa de fallo más alta. Se recomienda revisar la claridad del PDF.")

    with c2:
        st.subheader("Correlación: Tiempo vs. Nota")
        fig_scatter = px.scatter(df, x="Tiempo (min)", y="Nota", color="Estado", 
                                 color_discrete_map={"Aprobado": COLOR_VERDE, "Reprobado": COLOR_ROJO},
                                 hover_data=["Agente", "Módulo"])
        # Añadir linea de promedio
        fig_scatter.add_vline(x=df["Tiempo (min)"].mean(), line_width=1, line_dash="dash", line_color="grey")
        st.plotly_chart(fig_scatter, use_container_width=True)
        st.info("💡 **Insight:** Los usuarios que dedican menos de 4 minutos tienden a reprobar (zona roja a la izquierda).")

    # Raw Data Export
    st.markdown("---")
    st.subheader("📥 Exportar Data")
    csv = df.to_csv(index=False).encode('utf-8')
    st.download_button(
        "Descargar Reporte Completo (CSV)",
        csv,
        "cabify_training_data.csv",
        "text/csv",
        key='download-csv'
    )