# dummy_server.py
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class DummyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Respond with a JSON message
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        response = {"message": "Hello! This is a dummy JSON server."}
        self.wfile.write(json.dumps(response).encode("utf-8"))

def run(server_class=HTTPServer, handler_class=DummyHandler, port=8000):
    server_address = ("", port)
    httpd = server_class(server_address, handler_class)
    print(f"Serving on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
