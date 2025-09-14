from flask import Blueprint, render_template
sc_bp = Blueprint('mod_2_coordenadas', __name__, template_folder='templates', static_folder='static', static_url_path='/sc/static')
@sc_bp.route('/sistemas-de-coordenadas')
def sc_page():
    return render_template('sc_index.html')