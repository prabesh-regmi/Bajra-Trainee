import socket
import json


HOST = "192.168.1.84"  # Standard loopback interface address (localhost)
PORT = 65407  # Port to listen on (non-privileged ports are > 1023)
messages = []


def get_name_from_ip(ip):
    if ip == '1':
        return "Kirti"
    elif ip == '2':
        return "Aayush"
    elif ip == '192.168.1.84':
        return "Prabesh"
    else:
        return ip


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    # s.bind(('', 0))
    # s.getsockname()[1]
    s.listen()
    while True:
        conn, addr = s.accept()
        with conn:
            print(f"Connected by {addr}")
            data = conn.recv(1024)
            data = data.decode("utf-8")
            data = json.loads(data)
            print(data)
            response = {
                "hasMessage": False,
                "message": [],
            }
            if data["method"] == "POST":
                messages.append(
                    {
                        "from": get_name_from_ip(addr[0]),
                        "to": data["to"],
                        "message": data["message"]
                    }
                )
            else:
                for index, message in reversed(list(enumerate(messages))):
                    if addr[0] == message["to"]:
                        response["hasMessage"] = True
                        response["message"].append(message)
                        messages.pop(index)
            response = json.dumps(response)
            print(response)
            conn.sendall(bytes(response, "utf-8"))
