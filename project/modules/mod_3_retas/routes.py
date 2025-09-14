from flask import Blueprint, render_template, request, jsonify
import graphics_logic as lg
retas_bp = Blueprint('mod_3_retas', __name__, template_folder='templates', static_folder='static', static_url_path='/retas/static')
@retas_bp.route('/retas')
def retas_page():
    return render_template('retas_index.html')
@retas_bp.route('/api/retas/draw_line', methods=['POST'])
def api_draw_line():
    data = request.json
    p = [float(data['x1']), float(data['y1']), float(data['x2']), float(data['y2'])]
    points = lg.dda_line(*p) if data['algo'] == 'DDA' else lg.bresenham_line(*p)
    return jsonify(points)