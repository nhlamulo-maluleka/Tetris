import IPosition from "../interfaces/IPosition";

export default class Shapes {
    private shapes!: Array<IPosition>;

    constructor(centerRow: number, centerColumn: number) {
        this.shapes = [
            {
                shape: "T-block",
                image: "purple.png",
                rotate: true,
                direction: "top",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow,
                            col: centerColumn - 1
                        },
                        two: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        three: {
                            row: centerRow,
                            col: centerColumn + 1
                        },
                    }
                },
                changeDirection: {
                    right: {
                        one: {
                            row: -1,
                            col: +1
                        },
                        two: {
                            row: +1,
                            col: +1
                        },
                        three: {
                            row: +1,
                            col: -1
                        }
                    },
                    bottom: {
                        one: {
                            row: +1,
                            col: +1
                        },
                        two: {
                            row: +1,
                            col: -1
                        },
                        three: {
                            row: -1,
                            col: -1
                        }
                    },
                    left: {
                        one: {
                            row: +1,
                            col: -1
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -1,
                            col: +1,
                        }
                    },
                    top: {
                        one: {
                            row: -1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: +1,
                            col: +1,
                        }
                    }
                }
            },
            {
                shape: "S-block",
                image: "greenish.png",
                rotate: true,
                direction: "right",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow,
                            col: centerColumn - 1
                        },
                        two: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        three: {
                            row: centerRow - 1,
                            col: centerColumn + 1
                        },
                    }
                },
                changeDirection: {
                    bottom: {
                        one: {
                            row: -1,
                            col: +1,
                        },
                        two: {
                            row: +1,
                            col: +1,
                        },
                        three: {
                            row: +2,
                            col: +0
                        }
                    },
                    left: {
                        one: {
                            row: +1,
                            col: +1,
                        },
                        two: {
                            row: +1,
                            col: -1,
                        },
                        three: {
                            row: +0,
                            col: -2
                        }
                    },
                    top: {
                        one: {
                            row: +1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -2,
                            col: +0
                        }
                    },
                    right: {
                        one: {
                            row: -1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: +0,
                            col: +2
                        }
                    }
                }
            },
            {
                shape: "Z-block",
                image: "red.png",
                rotate: true,
                direction: "left",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow - 1,
                            col: centerColumn - 1
                        },
                        two: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        three: {
                            row: centerRow,
                            col: centerColumn + 1
                        },
                    }
                },
                changeDirection: {
                    top: {
                        one: {
                            row: +0,
                            col: +2,
                        },
                        two: {
                            row: +1,
                            col: +1,
                        },
                        three: {
                            row: +1,
                            col: -1
                        }
                    },
                    right: {
                        one: {
                            row: +2,
                            col: +0,
                        },
                        two: {
                            row: +1,
                            col: -1,
                        },
                        three: {
                            row: -1,
                            col: -1
                        }
                    },
                    bottom: {
                        one: {
                            row: +0,
                            col: -2,
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -1,
                            col: +1
                        }
                    },
                    left: {
                        one: {
                            row: -2,
                            col: +0,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: +1,
                            col: +1
                        }
                    }
                }
            },
            {
                shape: "O-block",
                image: "yellow.png",
                rotate: false,
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow,
                            col: centerColumn + 1
                        },
                        two: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        three: {
                            row: centerRow - 1,
                            col: centerColumn + 1
                        },
                    }
                },
            },
            {
                shape: "J-block",
                image: "blue.png",
                rotate: true,
                direction: "right",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        two: {
                            row: centerRow,
                            col: centerColumn + 1,
                        },
                        three: {
                            row: centerRow,
                            col: centerColumn + 2
                        },
                    }
                },
                changeDirection: {
                    bottom: {
                        one: {
                            row: +1,
                            col: +1,
                        },
                        two: {
                            row: +1,
                            col: -1,
                        },
                        three: {
                            row: +2,
                            col: -2
                        }
                    },
                    left: {
                        one: {
                            row: +1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -2,
                            col: -2
                        }
                    },
                    top: {
                        one: {
                            row: -1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: -2,
                            col: +2
                        }
                    },
                    right: {
                        one: {
                            row: -1,
                            col: +1,
                        },
                        two: {
                            row: +1,
                            col: +1,
                        },
                        three: {
                            row: +2,
                            col: +2
                        }
                    }
                }
            },
            {
                shape: "L-block",
                image: "orange.png",
                rotate: true,
                direction: "left",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow - 1,
                            col: centerColumn
                        },
                        two: {
                            row: centerRow,
                            col: centerColumn - 1,
                        },
                        three: {
                            row: centerRow,
                            col: centerColumn - 2
                        },
                    }
                },
                changeDirection: {
                    top: {
                        one: {
                            row: +1,
                            col: +1,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: -2,
                            col: +2
                        }
                    },
                    right: {
                        one: {
                            row: +1,
                            col: -1,
                        },
                        two: {
                            row: +1,
                            col: +1,
                        },
                        three: {
                            row: +2,
                            col: +2
                        }
                    },
                    bottom: {
                        one: {
                            row: -1,
                            col: -1,
                        },
                        two: {
                            row: +1,
                            col: -1,
                        },
                        three: {
                            row: +2,
                            col: -2
                        }
                    },
                    left: {
                        one: {
                            row: -1,
                            col: +1,
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -2,
                            col: -2
                        }
                    }
                }
            },
            {
                shape: "I-block",
                image: "sky.png",
                rotate: true,
                direction: "right",
                previous: null,
                current: {
                    center: {
                        row: centerRow,
                        col: centerColumn
                    },
                    adjacent: {
                        one: {
                            row: centerRow,
                            col: centerColumn - 1
                        },
                        two: {
                            row: centerRow,
                            col: centerColumn + 1,
                        },
                        three: {
                            row: centerRow,
                            col: centerColumn + 2
                        },
                    }
                },
                changeDirection: {
                    bottom: {
                        one: {
                            row: -1,
                            col: +1,
                        },
                        two: {
                            row: +1,
                            col: -1,
                        },
                        three: {
                            row: +2,
                            col: -2
                        }
                    },
                    left: {
                        one: {
                            row: +1,
                            col: +1,
                        },
                        two: {
                            row: -1,
                            col: -1,
                        },
                        three: {
                            row: -2,
                            col: -2,
                        }
                    },
                    top: {
                        one: {
                            row: +1,
                            col: -1,
                        },
                        two: {
                            row: -1,
                            col: +1,
                        },
                        three: {
                            row: -2,
                            col: +2,
                        }
                    },
                    right: {
                        one: {
                            row: -1,
                            col: -1,
                        },
                        two: {
                            row: +1,
                            col: +1,
                        },
                        three: {
                            row: +2,
                            col: +2,
                        }
                    }
                }
            }
        ]
    }

    public get blockShapes(): Array<IPosition> {
        return this.shapes;
    }
}