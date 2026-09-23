from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

class ErrorHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        print("====== BROWSER ERROR ======")
        print(urllib.parse.unquote(post_data.decode('utf-8')))
        print("===========================")
        self.send_response(200)
        self.end_headers()

HTTPServer(('localhost', 8081), ErrorHandler).serve_forever()
