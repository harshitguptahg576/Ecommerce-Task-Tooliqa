import { Model } from "sequelize";

export default (sequelize: any, DataTypes: any) => {
  class Log extends Model {
    public id!: number;
    public userId!: number;
    public action!: string;
    public details!: any;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      Log.belongsTo(models.User, { foreignKey: "userId" });
    }
  }

  Log.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      details: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Log",
    }
  );

  return Log;
};
