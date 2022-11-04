# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'messageApp.ui'
#
# Created by: PyQt5 UI code generator 5.14.1
#
# WARNING! All changes made in this file will be lost!


from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtCore import Qt
import socket


HOST = "192.168.88.217"  # The server's hostname or IP address
PORT = 65407  # The port used by the server

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(486, 519)
        self.central_widget = QtWidgets.QWidget(MainWindow)
        self.central_widget.setObjectName("central_widget")
        self.line = QtWidgets.QFrame(self.central_widget)
        self.line.setGeometry(QtCore.QRect(250, 70, 20, 321))
        self.line.setLineWidth(7)
        self.line.setFrameShape(QtWidgets.QFrame.VLine)
        self.line.setFrameShadow(QtWidgets.QFrame.Sunken)
        self.line.setObjectName("line")
        self.label = QtWidgets.QLabel(self.central_widget)
        self.label.setGeometry(QtCore.QRect(40, 120, 81, 17))
        self.label.setObjectName("label")
        self.receiver_ip_input = QtWidgets.QLineEdit(self.central_widget)
        self.receiver_ip_input.setGeometry(QtCore.QRect(40, 140, 171, 25))
        self.receiver_ip_input.setObjectName("receiver_ip_input")
        self.message_input = QtWidgets.QPlainTextEdit(self.central_widget)
        self.message_input.setGeometry(QtCore.QRect(40, 200, 171, 121))
        self.message_input.setObjectName("message_input")
        self.label_2 = QtWidgets.QLabel(self.central_widget)
        self.label_2.setGeometry(QtCore.QRect(40, 180, 67, 17))
        self.label_2.setObjectName("label_2")
        self.send_btn = QtWidgets.QPushButton(self.central_widget)
        self.send_btn.setGeometry(QtCore.QRect(80, 340, 89, 25))
        self.send_btn.setObjectName("send_btn")
        self.send_btn.clicked.connect(self.send_data)
        self.label_3 = QtWidgets.QLabel(self.central_widget)
        self.label_3.setGeometry(QtCore.QRect(40, 60, 171, 31))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.label_3.setFont(font)
        self.label_3.setObjectName("label_3")
        self.label_5 = QtWidgets.QLabel(self.central_widget)
        self.label_5.setGeometry(QtCore.QRect(300, 60, 171, 31))
        font = QtGui.QFont()
        font.setFamily("Ubuntu Condensed")
        font.setPointSize(18)
        font.setBold(True)
        font.setWeight(75)
        self.label_5.setFont(font)
        self.label_5.setObjectName("label_5")
        self.check_message_btn = QtWidgets.QPushButton(self.central_widget)
        self.check_message_btn.setGeometry(QtCore.QRect(290, 120, 161, 25))
        self.check_message_btn.setObjectName("check_message_btn")
        self.check_message_btn.clicked.connect(self.load_message)
        self.frame = QtWidgets.QFrame(self.central_widget)
        self.frame.setGeometry(QtCore.QRect(279, 159, 191, 291))
        self.frame.setFrameShape(QtWidgets.QFrame.StyledPanel)
        self.frame.setFrameShadow(QtWidgets.QFrame.Raised)
        self.frame.setObjectName("frame")
        self.display_message_label = QtWidgets.QLabel(self.frame)
        self.display_message_label.setGeometry(QtCore.QRect(6, 6, 181, 281))
        font = QtGui.QFont()
        font.setPointSize(10)
        self.display_message_label.setFont(font)
        self.display_message_label.setAutoFillBackground(False)
        self.display_message_label.setFrameShape(QtWidgets.QFrame.NoFrame)
        self.display_message_label.setLineWidth(0)
        self.display_message_label.setMidLineWidth(0)
        self.display_message_label.setWordWrap(False)
        self.display_message_label.setObjectName("display_message_label")
        self.display_message_label.setAlignment(Qt.AlignLeft | Qt.AlignTop)
        MainWindow.setCentralWidget(self.central_widget)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.label.setText(_translate("MainWindow", "Receiver IP"))
        self.label_2.setText(_translate("MainWindow", "Message"))
        self.send_btn.setText(_translate("MainWindow", "SEND"))
        self.label_3.setText(_translate("MainWindow", "Send Message !!"))
        self.label_5.setText(_translate("MainWindow", "Receive Message !!"))
        self.check_message_btn.setText(_translate("MainWindow", "Check For Message"))
        self.display_message_label.setText(_translate("MainWindow", "You have no message!!"))
    
    def load_message(self):
        # print("load message")
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((HOST, PORT))
            s.sendall(bytes("Send message","utf-8"))
            data = s.recv(1024)
            data =data.decode("utf-8")
            if "///" in data:
                sender = data.split("///")[0]
                receive_message =data.split("///")[1]
                self.display_message_label.setText(f"Message from: {sender} \n {receive_message}")
            else:
                self.display_message_label.setText(data)

        

    def send_data(self):
        receiver_ip = self.receiver_ip_input.text()
        message = self.message_input.toPlainText()
        # print(receiver_ip,message)
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.connect((HOST, PORT))
            s.sendall(bytes(f"{receiver_ip}///{message}","utf-8"))
            data = s.recv(1024)
            data =data.decode("utf-8")
            if "///" in data:
                sender = data.split("///")[0]
                receive_message =data.split("///")[1]
                self.display_message_label.setText(f"Message from: {sender} \n {receive_message}")






if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
