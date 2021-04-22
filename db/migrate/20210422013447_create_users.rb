class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.float :flow, :limit => 53, :null => true # making a DOUBLE with rails
      t.float :pressure, :limit => 53, :null => true # making a DOUBLE with rails

      t.timestamps
    end
  end
end
