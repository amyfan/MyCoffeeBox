class AddAssociations < ActiveRecord::Migration
  def change
    change_table :subscriptions do |t|
      t.belongs_to :user
      t.belongs_to :product_item
      t.belongs_to :shipping_info
    end
 
    change_table :product_items do |t|
      t.belongs_to :product
    end
 
    change_table :payments do |t|
      t.belongs_to :subscription
      t.belongs_to :payment_method
    end

    change_table :payment_methods do |t|
      t.belongs_to :user
    end
 
    change_table :shipping_infos do |t|
      t.belongs_to :user
    end

    change_table :shipments do |t|
      t.belongs_to :payment
    end

  end
end
