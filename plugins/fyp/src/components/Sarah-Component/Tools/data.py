from datetime import *

d1 = date(2023, 1, 30)
d2 = date(2023, 2, 5)
d3 = date(2023, 2, 6)
d4 = date(2023, 2, 12)
d5 = date(2023, 2, 13)
d6 = date(2023, 2, 19)
d7 = date(2023, 2, 20)
d8 = date(2023, 2, 26)
d9 = date(2023, 2, 27)
d10 = date(2023, 3, 5)

dates = {"week1" : [d1.strftime("%Y-%m-%d"), d2.strftime("%Y-%m-%d")], "week2" : [d3.strftime("%Y-%m-%d"), d4.strftime("%Y-%m-%d")], "week3": [d5.strftime("%Y-%m-%d"), d6.strftime("%Y-%m-%d")], "week4": [d7.strftime("%Y-%m-%d"), d8.strftime("%Y-%m-%d")], "week5" : [d9.strftime("%Y-%m-%d"), d10.strftime("%Y-%m-%d")]}

definitionIds = {"devops-dylon-react-test" : 4283 }