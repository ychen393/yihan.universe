"""Yihan's Universe local preview. No third-party Python packages required."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import os

ROOT = Path(__file__).resolve().parent
PORT = int(os.getenv("PORT", "4184"))

class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _spa_route(self):
        path = urlsplit(self.path).path.rstrip("/")
        parts = path.split("/")
        return path == "" or (len(parts) >= 2 and parts[1] in ("zh", "en")
            and (len(parts) == 2 or (len(parts) == 3 and parts[2] == "life")
            or (len(parts) == 4 and parts[2] == "work" and bool(parts[3]))))

    def _index(self, send_body=True):
        data = (ROOT / "index.html").read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if send_body:
            self.wfile.write(data)

    def do_GET(self):
        if self._spa_route():
            self._index()
        else:
            super().do_GET()

    def do_HEAD(self):
        if self._spa_route():
            self._index(send_body=False)
        else:
            super().do_HEAD()

if __name__ == "__main__":
    with ThreadingHTTPServer(("127.0.0.1", PORT), SPAHandler) as server:
        print(f"Yihan's Universe preview ready: http://127.0.0.1:{PORT}/zh")
        print("Open the English version at /en; Ctrl+C to stop.")
        server.serve_forever()
