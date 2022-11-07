import socket
import json


HOST = "192.168.88.217"  # Standard loopback interface address (localhost)
PORT = 65407  # Port to listen on (non-privileged ports are > 1023)
messages = []


def get_name_from_ip(ip):
    if ip == '10.10.100.22':
        return "Kirti"
    elif ip == '10.10.100.120':
        return "Aayush"
    elif ip == '10.10.100.117':
        return "Prabesh"
    else:
        return ip

def get_ip_from_name(name):
    if name.lower() == 'kirti':
        return "10.10.100.22"
    elif name.lower() == 'aayush':
        return "10.10.100.103"
    elif name.lower == 'prabesh':
        return "10.10.100.117"
    else:
        return name


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
                    if addr[0] == get_ip_from_name(message["to"]):
                        response["hasMessage"] = True
                        response["message"].append(message)
                        messages.pop(index)
            response = json.dumps(response)
            print(response)
            conn.sendall(bytes(response, "utf-8"))
