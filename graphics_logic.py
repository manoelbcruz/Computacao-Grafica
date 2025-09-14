import math

def dda_line(x1, y1, x2, y2):
    points = []
    dx = x2 - x1; dy = y2 - y1
    steps = max(abs(dx), abs(dy))
    if steps == 0:
        points.append({'x': round(x1), 'y': round(y1)})
        return points
    x_inc = dx / steps; y_inc = dy / steps
    x, y = float(x1), float(y1)
    for _ in range(int(steps) + 1):
        points.append({'x': round(x), 'y': round(y)})
        x += x_inc; y += y_inc
    return points

def bresenham_line(x1, y1, x2, y2):
    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
    points = []
    dx = abs(x2 - x1); dy = abs(y2 - y1)
    sx = 1 if x1 < x2 else -1; sy = 1 if y1 < y2 else -1
    err = dx - dy
    while True:
        points.append({'x': x1, 'y': y1})
        if x1 == x2 and y1 == y2: break
        e2 = 2 * err
        if e2 > -dy: err -= dy; x1 += sx
        if e2 < dx: err += dx; y1 += sy
    return points

def bresenham_circle(xc, yc, r):
    points = []
    x, y = 0, r; p = 1 - r
    def plot_circle_points(cx, cy, x, y):
        points.extend([
            {'x': cx + x, 'y': cy + y}, {'x': cx - x, 'y': cy + y}, {'x': cx + x, 'y': cy - y}, {'x': cx - x, 'y': cy - y},
            {'x': cx + y, 'y': cy + x}, {'x': cx - y, 'y': cy + x}, {'x': cx + y, 'y': cy - x}, {'x': cx - y, 'y': cy - x}
        ])
    plot_circle_points(xc, yc, x, y)
    while x < y:
        x += 1
        if p < 0: p += 2 * x + 1
        else: y -= 1; p += 2 * (x - y) + 1
        plot_circle_points(xc, yc, x, y)
    return points

def multiply_matrices(m1, m2):
    result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    for i in range(3):
        for j in range(3):
            for k in range(3):
                result[i][j] += m1[i][k] * m2[k][j]
    return result

def apply_transform(points, matrix):
    new_points = []
    for p in points:
        px, py = p['x'], p['y']
        new_x = matrix[0][0] * px + matrix[0][1] * py + matrix[0][2]
        new_y = matrix[1][0] * px + matrix[1][1] * py + matrix[1][2]
        new_points.append({'x': new_x, 'y': new_y})
    return new_points

def create_translation_matrix(tx, ty):
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]]

def create_scale_matrix(sx, sy, cx, cy):
    t1 = create_translation_matrix(-cx, -cy)
    s = [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]
    t2 = create_translation_matrix(cx, cy)
    return multiply_matrices(t2, multiply_matrices(s, t1))

def create_rotation_matrix(angle_degrees, cx, cy):
    rad = math.radians(angle_degrees)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    t1 = create_translation_matrix(-cx, -cy)
    r = [[cos_a, -sin_a, 0], [sin_a, cos_a, 0], [0, 0, 1]]
    t2 = create_translation_matrix(cx, cy)
    return multiply_matrices(t2, multiply_matrices(r, t1))