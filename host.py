import socket

HOST = "192.168.1.84"  # Standard loopback interface address (localhost)
PORT = 65407  # Port to listen on (non-privileged ports are > 1023)
messages =[]

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    # s.bind(('', 0))
    # s.getsockname()[1]
    s.listen()
    while True:
        conn, addr = s.accept()
        with conn:
            print(f"Connected by {addr}")
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                data = data.decode("utf-8")
                if "///" in data:
                    messages.append((addr[0],data.split("///")))
                print(messages)
                for index,message in enumerate(messages):
                    if addr[0] in message[1][0]:
                        conn.sendall(bytes('///'.join([message[0],message[1][1]]),"utf-8"))
                        messages.pop(index)
                conn.sendall(bytes("You Have no message","utf-8"))