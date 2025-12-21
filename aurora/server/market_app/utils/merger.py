def equity_merge(user, benchmark):
    equities = []
    spy_dict = {}
    for val in benchmark:
        spy_dict[val["date"]] = val["Equity"]

    for val in user:
        date = val["date"]
        equities.append(
            {
                "date": date,
                "Equity": val["Equity"],
                "benchmark": spy_dict[date]
            }
        )

    return equities