from flask import Blueprint, render_template, request, jsonify
import graphics_logic as lg
circ_bp = Blueprint('mod_4_circunferencia', __name__, template_folder='templates', static_folder='static', static_url_path='/circ/static')
@circ_bp.route('/circunferencias')
def circ_page():
    return render_template('circ_index.html')
@circ_bp.route('/api/circ/draw_circle', methods=['POST'])
def api_draw_circle():
    data = request.json
    p = [int(data['xc']), int(data['yc']), int(data['r'])]
    points = lg.bresenham_circle(*p)
    return jsonify(points)