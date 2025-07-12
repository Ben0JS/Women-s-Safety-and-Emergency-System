from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import csv

app = Flask(__name__)
CORS(app)

@app.route('/alert', methods=['POST'])
def receive_alert():
    data = request.get_json()
    lat = data.get('latitude')
    lon = data.get('longitude')
    message = data.get('message')

    with open('alerts.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow([datetime.now(), lat, lon, message])

    print(f"✅ Alert Received: {lat}, {lon}")  # For debugging

    # ✅ Return JSON so frontend fetch().then() works
    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(debug=True)
