import os
import json
import uuid
from flask import Flask, session, redirect, url_for, request, render_template, jsonify
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
from datetime import datetime, timedelta
import gspread
from google.oauth2.service_account import Credentials

load_dotenv()

app = Flask(__name__)
app.permanent_session_lifetime = timedelta(minutes=30)
app.secret_key = os.getenv("SECRET_KEY", "dev_key")

@app.before_request
def make_session_permanent():
    session.permanent = True

# ====== IFRAmes (antes de qualquer rota) ======
LOOKERS = {
    'expectant': {
        'overview_ads': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_03hj6qcmvd',
        'overview_ga4': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_8k5zdcvuvd',
        'recent': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_rbf34iv8ud',
        'google_ads': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_8eecz0rovd',
        'campaign_break': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_tadcyerovd',
        'campaign_costs': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_ep8hx4qovd',
        'contact_cost': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_jvidqwqovd',
        'day_of_week': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_1cwm5jqovd',
        'campaign_ratios': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_zx6sodqovd',
        'contact_break': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_1r1tjgpovd',
        'spam_break': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_an0bb3povd',
    },
    'marketing': {
        'performance_time': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_hxd854tovd',
        'cost_per': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_3i0yaalovd',
        'table_download': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_4wsin3lovd',
        'enroll_placements': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_p95uwh89vd',
        'enroll_admission': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_72wuuqv6vd',
        'enroll_creation': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_o9fkb2oavd',
        'enroll_timeseries': 'https://lookerstudio.google.com/embed/reporting/018fe7d3-8e30-4a70-86e9-ac5b71bdb662/page/p_094a1q3nvd',
    },
    'gladney': {
        'adoptive_performance': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_0cruxnlesd',
        'adoptive_recent': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_fs1i0mafsd',
        'adoptive_timeline': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_jaslgym7rd',
        'birth_overall': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_n5o80slctd',
        'birth_detailed': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_s68jx6lxtd',
        'birth_recent': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_ox7c5fxitd',
        'birth_breakdown': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_eoarhx0jtd',
        'birth_timeline': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_q9c5vyustd',
        'new_performance': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_pnl8efo3sd',
        'new_recent': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_dbfsn7afsd',
        'new_timeline': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_84ojqj4asd',
        'drilldown_domestic': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_g64kpxaatd',
        'drilldown_new': 'https://lookerstudio.google.com/embed/reporting/704ba1ac-c624-464f-a9f5-4f0f7ecadbfc/page/p_q32x6kaatd',
    },
    'traffic': {
        'cover_page': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_z2i9rcdktd',
        'traffic_user_overview': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_bppth3a2sd',
        'sessions_overview': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_amhq0bb2sd',
        'user_overview': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_zs34w5f2sd',
        'google_ads_keywords': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_b5uzxjdktd',
        'demographic_info': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_snmx9lgltd',
        'events_top_pages': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_hdoejlb2sd',
        'conversion_events': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_od7jq6f2sd',
        'conversion_performance': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_pfbpeii2sd',
        'ai_vs_human': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_60iwvfimtd',
        'ai_deep_dive': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_m7azaxhmtd',
        'temporary_visualization': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_zpttqz0qtd',
        'google_analytics_dashboard': 'https://lookerstudio.google.com/embed/reporting/186ac7bf-c1de-463f-9fe7-c4eeef98acdb/page/p_mppqixq3vd',
    }
}

# ====== Função: Credenciais Google Sheets ======
def get_google_credentials():
    credentials_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    if not credentials_json:
        raise Exception("❌ GOOGLE_APPLICATION_CREDENTIALS_JSON não encontrada.")
    info = json.loads(credentials_json)
    scopes = ['https://www.googleapis.com/auth/spreadsheets']
    return Credentials.from_service_account_info(info, scopes=scopes)

# ====== Função: Log ======
def log_access(email, rota, extra_action=None):
    timestamp = datetime.now().isoformat()
    ip = request.remote_addr or "unknown"
    user_agent = request.headers.get('User-Agent') or "unknown"
    session_id = session.get("session_id", "unknown")
    last_action_time = session.get("last_action_time")
    last_route = session.get("last_route")
    last_tab = session.get("last_extra_action")

    if last_action_time and last_tab:
        try:
            time_diff = (datetime.now() - datetime.fromisoformat(last_action_time)).total_seconds()
            SPREADSHEET_ID = "1PtGM-CLkru5jWytYZfDW9ay-tFDJhHiIWSBGjL32Vbk"
            creds = get_google_credentials()
            client = gspread.authorize(creds)
            sheet = client.open_by_key(SPREADSHEET_ID).sheet1

            if sheet.row_count == 0 or sheet.cell(1, 1).value != "Timestamp":
                sheet.clear()
                sheet.append_row(["Timestamp", "Email", "Rota", "Extra Action", "IP", "User-Agent", "Session ID", "Time Since Last Action (s)"])

            sheet.append_row([
                timestamp, email, last_route or "", last_tab, ip, user_agent, session_id, round(time_diff, 2)
            ])
        except Exception as e:
            print(f"❌ Erro ao salvar log: {e}")

    session["last_action_time"] = timestamp
    session["last_route"] = rota
    session["last_extra_action"] = extra_action or ""

# ====== OAuth Google ======
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile', 'prompt': 'consent', 'access_type': 'offline'}
)

# ====== Rotas ======

@app.route('/')
def landing_page():
    return render_template("landing.html")

@app.route('/dashboard')
def dashboard():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    
    # Default to expectant mother dashboard
    selected_group = request.args.get('group', 'expectant')
    selected_view = request.args.get('view', 'overview_ads')
    
    log_access(user["email"], "/dashboard")
    return render_template("dashboard.html", 
                         user=user, 
                         selected_group=selected_group,
                         selected_view=selected_view)

@app.route('/api/iframe_url')
def get_iframe_url():
    user = session.get("user")
    if not user:
        return jsonify({"error": "unauthorized"}), 401
    
    group = request.args.get('group', 'expectant')
    view = request.args.get('view', 'overview_ads')
    
    # Map to the correct iframe URLs
    url = LOOKERS.get(group, {}).get(view, 'about:blank')
    log_access(user["email"], f"/api/iframe_url?group={group}&view={view}")
    
    return jsonify({"url": url})

@app.route('/expectant_mother')
def expectant_mother():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    iframe_url = LOOKERS['expectant']['overview_ads']
    log_access(user["email"], "/expectant_mother")
    return render_template("expectant_mother.html", user=user, iframe_url=iframe_url, active_tab='overview_ads')

@app.route('/expectant_mother/expectant/<tab>')
def expectant_expectant_mother(tab):
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    iframe_url = LOOKERS['expectant'].get(tab, LOOKERS['expectant']['overview_ads'])
    log_access(user["email"], f"/expectant_mother/expectant/{tab}")
    return render_template("expectant_mother.html", user=user, iframe_url=iframe_url, active_tab=tab)

@app.route('/gladney_business_performance')
def gladney_business_performance():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    default_tab = list(LOOKERS['gladney'].keys())[0]
    iframe_url = LOOKERS['gladney'][default_tab]
    log_access(user["email"], "/gladney_business_performance")
    return render_template("gladney_business_performance.html", user=user, iframe_url=iframe_url, active_tab=default_tab)

@app.route('/gladney_business_performance/<tab>')
def gladney_business_performance_tab(tab):
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    iframe_url = LOOKERS['gladney'].get(tab)
    if not iframe_url:
        iframe_url = list(LOOKERS['gladney'].values())[0]
    log_access(user["email"], f"/gladney_business_performance/{tab}")
    return render_template("gladney_business_performance.html", user=user, iframe_url=iframe_url, active_tab=tab)

@app.route('/page_traffic_monitor')
def page_traffic_monitor():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))

    # Define a aba default
    default_tab = list(LOOKERS['traffic'].keys())[0]
    iframe_url = LOOKERS['traffic'][default_tab]

    log_access(user["email"], "/page_traffic_monitor")
    return render_template("page_traffic_monitor.html", user=user, iframe_url=iframe_url, active_tab=default_tab)


@app.route('/page_traffic_monitor/<tab>')
def page_traffic_monitor_tab(tab):
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    iframe_url = LOOKERS['traffic'].get(tab)
    if not iframe_url:
        iframe_url = list(LOOKERS['traffic'].values())[0]
    log_access(user["email"], f"/page_traffic_monitor/{tab}")
    return render_template("page_traffic_monitor.html", user=user, iframe_url=iframe_url, active_tab=tab)

@app.route('/dashboard_details')
def dashboard_details():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    log_access(user["email"], "/dashboard_details")
    return render_template("dashboard_details.html", user=user)

@app.route('/dashboard_faq')
def dashboard_faq():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    log_access(user["email"], "/dashboard_faq")
    return render_template("dashboard_faq.html", user=user)

@app.route('/notification')
def notification():
    user = session.get("user")
    if not user:
        return redirect(url_for("login"))
    log_access(user["email"], "/notification")
    return render_template("notification.html", user=user)

@app.route('/login')
def login():
    redirect_uri = url_for("authorize", _external=True, _scheme="https")
    return google.authorize_redirect(redirect_uri)

@app.route('/authorize')
def authorize():
    try:
        token = google.authorize_access_token()
        resp = google.get('https://openidconnect.googleapis.com/v1/userinfo')
        user_info = resp.json()
        user_email = user_info.get("email")

        ALLOWED_EMAILS = ["leonardo.decastro.brazil@gmail.com"]
        ALLOWED_DOMAIN = "@upstart13.com"

        if not (user_email.endswith(ALLOWED_DOMAIN) or user_email in ALLOWED_EMAILS):
            log_access(user_email, "/unauthorized", extra_action="Unauthorized Access Attempt")
            return render_template("unauthorized.html", user=user_info), 403

        session.permanent = True
        session["session_id"] = str(uuid.uuid4())
        session["user"] = {
            "name": user_info.get("name"),
            "email": user_email,
            "picture": user_info.get("picture"),
            "login_time": datetime.now().isoformat()
        }

        log_access(user_email, "/authorize")
        return redirect(url_for("dashboard"))

    except Exception as e:
        return f"❌ Erro durante autenticação: {str(e)}", 500

@app.route('/logout')
def logout():
    user = session.get("user")
    if user:
        log_access(user["email"], "/logout")
    session.clear()
    return redirect(url_for("landing_page"))

@app.route('/track_action', methods=['POST'])
def track_action():
    try:
        user = session.get("user")
        if not user:
            return jsonify({"status": "unauthorized"}), 401
        data = request.get_json()
        action = data.get("action", "Ação desconhecida")
        log_access(user["email"], "/track_action", extra_action=action)
        return jsonify({"status": "ok"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/unauthorized')
def unauthorized():
    return render_template("unauthorized.html")

# ====== Run App ======
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
